import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as mjs from 'mjs2-ngv';
import './AnotationTool.scss';

const AnotationTool = ({ folderName, imageIndex, isRotationAllowed, image, setNotes, marks }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [MA, setMA] = useState(null) // MarkerArea global state
    const [markerAreaState, setMarkerAreaState] = useState() // MarkerArea state for restoring
    // eslint-disable-next-line
    const [markersInfoArray, setMarkersInfoArray] = useState([]) // markers with filtered info for backend

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sourceImageRef = useRef(null) // image in initial state, withouth markers
    const sampleImageRef = useRef(null) // image, which we redact

    const selectedMarker = useRef(null) // TODO // to check marker selecting state
    // eslint-disable-next-line
    const notes = useRef({}) // labels array
    const dropboxDivRef = useRef(null)

    const markersArray = useRef([]) // TODO // to save markers state for backend


    const showMarkerArea = () => {
        MA.show(); // show markerArea on image
        if (markerAreaState) { // if we have initial state, restore it
            sampleImageRef.current.style.opacity = 0;
            // sampleImageRef.current.style.top = -40 + 'px';
            sourceImageRef.current.style.top = -40 + 'px';
            MA.restoreState(markerAreaState)
            // if (!restored.current) {
            //     restored.current = true;
            //     MA.startRenderAndClose().then(() => showMarkerArea())
            // }
        }
        if (!markerAreaState?.markers?.length) {
            MA.createNewMarker(mjs.FrameMarker)
        }
    }

    useEffect(() => { // INIT //
        console.log(`marks`, marks)
        MA?.close();
        setMarkerAreaState({
            width: sampleImageRef.current?.clientWidth ?? 512,
            height: sampleImageRef.current?.clientHeight ?? 512,
            markers: marks?.map(mark => ({
                containerTransformMatrix: mark.matrix,
                fillColor: "transparent",
                height: mark.height,
                width: mark.width,
                top: 0,
                left: 0,
                id: 0,
                notes: mark.name,
                opacity: 1,
                prevNotes: undefined,
                rotationAngle: mark.angle,
                state: "select",
                strokeColor: "#69dafb",
                strokeDasharray: "",
                strokeWidth: 3,
                typeName: "FrameMarker",
                visualTransformMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
            })) || []
        });

        setNotes({});
        markersInfoArray.current = {}
        notes.current = {}

        if (sampleImageRef.current) {
            sampleImageRef.current.src = sourceImageRef.current.src;

            const markerArea = new mjs.MarkerArea(sourceImageRef.current);

            markerArea.renderAtNaturalSize = true;
            markerArea.availableMarkerTypes = [mjs.FrameMarker];
            markerArea.targetRoot = sourceImageRef.current.parentElement;
            markerArea.uiStyleSettings.undoButtonVisible = false;
            markerArea.settings.defaultColor = "#69dafb";
            markerArea.settings.defaultFillColor = "#69dafbcc"

            markerArea.settings.isRotationAllowed = isRotationAllowed;
            markerArea.uiStyleSettings.hideToolbar = false;
            markerArea.uiStyleSettings.hideToolbox = true;
            markerArea.uiStyleSettings.notesButtonVisible = false;
            markerArea.uiStyleSettings.notesAreaStyleClassName = 'dropboxDiv';
            markerArea.uiStyleSettings.toolbarStyleColorsClassName = 'PF';
            markerArea.uiStyleSettings.toolboxStyleColorsClassName = 'DN'
            markerArea.uiStyleSettings.toolboxPanelRowStyleColorsClassName = 'DN'
            markerArea.uiStyleSettings.toolboxButtonRowStyleColorsClassName = 'DN'
            console.log(`markerArea`, markerArea)

            markerArea.addRenderEventListener((dataUrl, state) => {
                if (sampleImageRef.current) {
                    sampleImageRef.current.src = dataUrl; // render image with drawed markers
                    setMarkerAreaState(state); // save state of MarkerArea to be able to restore it

                    markersArray.current = state.markers; // TODO //

                    const markers = markersArray.current.map((i, id) => {
                        return ({
                            width: i.width,
                            height: i.height,
                            angle: i.rotationAngle,
                            name: i.notes,
                            x: i.left,
                            y: i.top,
                            matrix: i.containerTransformMatrix
                        })
                    })

                    setMarkersInfoArray(markers)
                    setNotes({ ...notes.current })

                    const toasterId = toast.loading('Creating an XML file for your Image', { theme: 'colored' })
                    setLoading(true)
                    fetch(`${apiUrl}create-data/rbb`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            "x-access-token": localStorage.getItem('token')
                        },
                        body: JSON.stringify({ folder_name: folderName, img_index: imageIndex, labels: markers })
                    })
                        .then(res => {
                            return res.json()
                        })
                        .then(res => {
                            console.log(`res`, res)
                            if (res.status === 'fail') {
                                toast.update(toasterId, { render: res.message, type: 'error' })
                                throw new Error(res.message)
                            }
                            toast.update(toasterId, { render: 'The XML has been generated successfully', type: 'success', pauseOnHover: false, pauseOnFocusLoss: false, progress: undefined, autoClose: 2000, draggable: true, hideProgressBar: false, })
                        })
                        .catch(e => {
                            toast.update(toasterId, { render: `${e}`, type: 'error', autoClose: 2000, pauseOnHover: false, pauseOnFocusLoss: false, draggable: true, progress: undefined, hideProgressBar: false })
                        })
                        .finally(() => {
                            setTimeout(() => {
                                toast.dismiss(toasterId)
                                setLoading(false)
                            }, 2000)
                        })
                }
            });

            markerArea.addDeleteEventListener(marker => {

                if (marker.notes) {
                    console.log(notes.current[marker.notes]);
                    notes.current[marker.notes].count--;
                    if (notes.current[marker.notes].count < 1) {
                        delete notes.current[marker.notes]
                    }
                }

                markerArea.hideNotesEditor()

                if (marker.notes) {
                    console.log(notes.current[marker.notes]);
                    notes.current[marker.notes].count--;
                    if (notes.current[marker.notes].count < 1) {
                        delete notes.current[marker.notes]
                    }
                }
            })

            markerArea.addDeselectEventListener(marker => {
                if (markerArea.getState().markers.length) {
                    const { prevNote } = selectedMarker.current
                    const note = markerArea.hideNotesEditor();
                    console.log(`selectedMarker.current, note`, selectedMarker.current, note)
                    if (!note) {
                        marker.select()
                        markerArea.setCurrentMarker(marker)
                        const { notesArea } = markerArea.showNotesEditor()

                        const mState = marker.getState()
                        notesArea.style.left = mState.left - 20 + 'px'
                        notesArea.style.top = mState.top + mState.height + 'px'
                        // alert('Notes can\'t be empty')
                        notesArea.select()

                    } else {
                        if (prevNote) {
                            notes.current[prevNote]--;
                            console.log(`prevNote`, prevNote)
                            notes.current[note]++ || (notes.current[note] = 1);

                            if (notes.current[prevNote] < 1) {
                                delete notes.current[prevNote]
                            }
                        } else {
                            notes.current[note]++ || (notes.current[note] = 1);
                        }
                    }

                    selectedMarker.current = null
                }
            });

            markerArea.addSelectEventListener((marker, id) => {
                if (markerArea.getState().markers.length) {
                    if (id !== selectedMarker.current) {
                        markerArea.hideNotesEditor()
                        const { notesArea, currentValue } = markerArea.showNotesEditor();

                        selectedMarker.current = { id: marker.id, prevNote: currentValue }

                        dropboxDivRef.current = notesArea;

                        const mState = marker.getState()
                        notesArea.style.left = mState.left - 20 + 'px'
                        notesArea.style.top = mState.top + mState.height + 'px'
                    }
                }
            });

            markerArea.addMoveEventListener((marker) => {
                const { notesArea } = markerArea.showNotesEditor();

                const mState = marker.getState()
                notesArea.style.left = mState.left - 20 + 'px'
                notesArea.style.top = mState.top + mState.height + 'px'
            })

            markerArea.addCloseEventListener(() => {
                sampleImageRef.current.style.opacity = 1;
                sampleImageRef.current.style.top = 0;
                sourceImageRef.current.style.top = 0;
            });

            markerArea.addNoNotesEventListener(markersWithoutNotes => {
                markersWithoutNotes[0].select()
                markerArea.setCurrentMarker(markersWithoutNotes[0])
                const mState = markersWithoutNotes[0].getState()
                const { notesArea } = markerArea.showNotesEditor()

                notesArea.style.left = mState.left - 20 + 'px'
                notesArea.style.top = mState.top + mState.height + 'px'
                // alert('Notes can\'t be empty')
                notesArea.select()
            })

            setMA(markerArea);
        }
    }, [isRotationAllowed, image, marks, setNotes])

    return (
        <div className='anotationToolBox'>
            <div style={{ width: 512, height: 512, overflow: 'auto auto', position: 'absolute' }}>
                <img
                    src={image}
                    ref={sourceImageRef}
                    alt='Source'
                    style={{ position: 'absolute', height: 'auto' }}
                    crossOrigin='anonymous'
                />
                <img
                    src={image}
                    ref={sampleImageRef}
                    alt='Sample'
                    style={{ position: 'absolute' }}
                    crossOrigin='anonymous'
                    onClick={() => {
                        if(!loading) showMarkerArea()
                    }}
                />
            </div>
        </div>
    );
}

export default AnotationTool;