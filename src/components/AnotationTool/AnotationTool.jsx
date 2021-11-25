import React, { useState, useEffect, useRef } from 'react';
import * as mjs from 'mjs2-ngv';
import './AnotationTool.scss';

const AnotationTool = ({ isRotationAllowed, image, setNotes, marks }) => {
    const [MA, setMA] = useState(null) // MarkerArea global state
    const [markerAreaState, setMarkerAreaState] = useState() // MarkerArea state for restoring
    // eslint-disable-next-line
    const [markersInfoArray, setMarkersInfoArray] = useState([]) // markers with filtered info for backend

    const sourceImageRef = useRef(null) // image in initial state, withouth markers
    const sampleImageRef = useRef(null) // image, which we redact

    const selectedMarker = useRef(null) // TODO // to check marker selecting state
    // eslint-disable-next-line
    const notes = useRef({}) // labels array
    const dropboxDivRef = useRef(null)
    const restored = useRef(false);

    const markersArray = useRef([]) // TODO // to save markers state for backend


    const showMarkerArea = () => {
        MA.show(); // show markerArea on image
        if (markerAreaState) { // if we have initial state, restore it
            sampleImageRef.current.style.opacity = 0;
            // sampleImageRef.current.style.top = -40 + 'px';
            sourceImageRef.current.style.top = -40 + 'px';
            MA.restoreState(markerAreaState)
            if (!restored.current) {
                restored.current = true;
                MA.startRenderAndClose().then(() => showMarkerArea())
            }
        }
        if (!markerAreaState?.markers?.length) {
            MA.createNewMarker(mjs.FrameMarker)
        }
    }

    useEffect(() => {
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
        console.log(`markerAreaState`, markerAreaState)
        console.log('markersInfoArray', markers);
        setMarkersInfoArray(markers)
        console.log(`notes.current`, notes.current)
        setNotes({ ...notes.current })
    }, [markerAreaState])


    useEffect(async () => { // INIT //
        console.log(`marks`, marks)
        await MA?.close();
        setMarkerAreaState({
            width: sampleImageRef.current.clientWidth,
            height: sampleImageRef.current.clientHeight,
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
                    console.log(`notesArray.current`, notes.current)
                    console.log(`markersArray`, markersArray)
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
                        // TRY TO PREVENT DESELECTING
                        // markerArea.show()
                        // sampleImageRef.current.style.opacity = 0;
                        // markerArea.restoreState(markerArea.getState())
                        // markerArea.setCurrentMarker(marker)
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
                        const { notesArea, currentValue } = markerArea.showNotesEditor();

                        selectedMarker.current = { id: marker.id, prevNote: currentValue }

                        dropboxDivRef.current = notesArea;
                        // notesArea.style.position = 'fixed'
                        // notesArea.style.width = 600 + 'px'
                        // notesArea.style.zIndex = 999

                        // sampleImageRef.current.style.top = 40 + 'px';
                        // sourceImageRef.current.style.top = 40 + 'px';
                    }
                }
            });

            markerArea.addCloseEventListener(() => {
                sampleImageRef.current.style.opacity = 1;
                sampleImageRef.current.style.top = 0;
                sourceImageRef.current.style.top = 0;
            });

            setMA(markerArea);
        }
    }, [isRotationAllowed, image])

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
                    onClick={showMarkerArea}
                />
            </div>
        </div>
    );
}

export default AnotationTool;