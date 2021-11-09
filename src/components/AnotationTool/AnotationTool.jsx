import React, { useState, useEffect, useRef } from 'react';
import * as mjs from 'mjs2-ngv';
import './AnotationTool.scss';

const AnotationTool = ({ isRotationAllowed, image }) => {

    const [MA, setMA] = useState(null) // MarkerArea global state
    const [markerAreaState, setMarkerAreaState] = useState(null) // MarkerArea state for restoring
    // eslint-disable-next-line
    const [markersInfoArray, setMarkersInfoArray] = useState([]) // markers with filtered info for backend

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
            MA.restoreState(markerAreaState)
        }
        if (!markerAreaState?.markers?.length) {
            MA.createNewMarker(mjs.FrameMarker)
        } else {
            console.log(markerAreaState.markers);
        }
    }

    useEffect(() => {
        const markers = markersArray.current.map((i, id) => {
            if (i.rotationAngle !== 0) {
                return ({
                    centerX: i.left + i.width / 2,
                    centerY: i.top + i.height / 2,
                    rotationAngle: i.rotationAngle,
                    label: i.notes
                })
            } else {
                return ({
                    topLeftX: i.left,
                    topLeftY: i.top,
                    bottomRightX: i.left + i.width,
                    bottomRightY: i.top + i.height,
                    label: i.notes
                })
            }
        })

        setMarkersInfoArray(markers)
    }, [markerAreaState])

    useEffect(() => { // INIT // 
        const initializeMarkerArea = () => {
            setMarkerAreaState(null)
            if (sampleImageRef.current) {
                sampleImageRef.current.src = sourceImageRef.current.src;

                const markerArea = new mjs.MarkerArea(sourceImageRef.current);

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
                            notes.current[marker.notes] = undefined;
                        }
                    }

                    markerArea.hideNotesEditor()

                    if (marker.notes) {
                        console.log(notes.current[marker.notes]);
                        notes.current[marker.notes].count--;
                        if (notes.current[marker.notes].count < 1) {
                            notes.current[marker.notes] = undefined;
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
                                    notes.current[prevNote] = undefined;
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
                            dropboxDivRef.current.style.bottom = 0; // textarea styles
                        }
                    }
                });

                markerArea.addCloseEventListener(() => {
                    sampleImageRef.current.style.opacity = 1;
                });

                setMA(markerArea);
            }
        }

        initializeMarkerArea();
    }, [isRotationAllowed, image])

    return (
        <div className='anotationToolBox'>
            <img
                src={image}
                ref={sourceImageRef}
                alt='Source'
                style={{ maxWidth: '35%', position: 'absolute' }}
                crossOrigin='anonymous'
            />
            <img
                src={image}
                ref={sampleImageRef}
                alt='Sample'
                style={{ maxWidth: '35%', position: 'absolute' }}
                crossOrigin='anonymous'
                onClick={showMarkerArea}
            />
        </div>
    );
}

export default AnotationTool;