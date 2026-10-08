const calendar =
    document.getElementById(
        "availabilityCalendar"
    );


const availabilitySummary =
    document.getElementById(
        "availabilitySummary"
    );


const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


const START_HOUR = 6;
const END_HOUR = 23;

const SLOT_MINUTES = 30;


const selectedCalendarAvailability =
    new Set();


let isDragging = false;

let dragMode = "add";


let lastPaintedKey = null;


for (
    let hour = START_HOUR;
    hour < END_HOUR;
    hour++
) {

    for (
        let half = 0;
        half < 2;
        half++
    ) {

        const minutes =
            hour * 60 +
            half * SLOT_MINUTES;



        const timeLabel =
            document.createElement("div");


        timeLabel.className =
            "calendarTimeLabel";


        if (half === 0) {

            timeLabel.textContent =
                formatTime(minutes);

        }


        calendar.appendChild(
            timeLabel
        );



        days.forEach(day => {

            const slot =
                document.createElement("div");


            slot.className =
                "calendarSlot";


            slot.dataset.day =
                day;


            slot.dataset.minutes =
                minutes;


            slot.dataset.time =
                formatTime(minutes);


            calendar.appendChild(
                slot
            );

        });

    }

}


const calendarSlots =
    document.querySelectorAll(
        ".calendarSlot"
    );


calendarSlots.forEach(slot => {


    slot.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            isDragging = true;


            const key =
                getKey(slot);




            dragMode =
                selectedCalendarAvailability.has(key)
                    ? "remove"
                    : "add";


            lastPaintedKey =
                null;


            paintSlot(slot);

        }
    );




    slot.addEventListener(
        "pointerenter",
        () => {

            if (!isDragging) {
                return;
            }


            paintSlot(slot);

        }
    );




    slot.addEventListener(
        "click",
        () => {

        }
    );

});


document.addEventListener(
    "pointerup",
    () => {

        if (!isDragging) {
            return;
        }


        isDragging = false;

        lastPaintedKey = null;


        updateSelectionEdges();

        updateAvailabilitySummary();

    }
);



function paintSlot(slot) {

    const key =
        getKey(slot);



    if (
        key === lastPaintedKey
    ) {

        return;

    }


    lastPaintedKey =
        key;


    if (dragMode === "add") {

        selectedCalendarAvailability.add(
            key
        );


        slot.classList.add(
            "selectedCalendar"
        );

    }


    else {

        selectedCalendarAvailability.delete(
            key
        );


        slot.classList.remove(
            "selectedCalendar"
        );

    }


    updateSelectionEdges();

}



function getKey(slot) {

    return (
        slot.dataset.day +
        "|" +
        slot.dataset.minutes
    );

}


function updateSelectionEdges() {

    

    calendarSlots.forEach(slot => {

        slot.classList.remove(
            "edge-top",
            "edge-bottom",
            "edge-left",
            "edge-right",
            "corner-top-left",
            "corner-top-right",
            "corner-bottom-left",
            "corner-bottom-right"
        );

    });


    calendarSlots.forEach(slot => {

        if (
            !selectedCalendarAvailability.has(
                getKey(slot)
            )
        ) {

            return;

        }


        const day =
            days.indexOf(
                slot.dataset.day
            );


        const minutes =
            Number(
                slot.dataset.minutes
            );


        const top =
            isSelected(
                day,
                minutes - SLOT_MINUTES
            );


        const bottom =
            isSelected(
                day,
                minutes + SLOT_MINUTES
            );


        const left =
            isSelected(
                day - 1,
                minutes
            );


        const right =
            isSelected(
                day + 1,
                minutes
            );



        if (!top) {

            slot.classList.add(
                "edge-top"
            );

        }


        if (!bottom) {

            slot.classList.add(
                "edge-bottom"
            );

        }


        if (!left) {

            slot.classList.add(
                "edge-left"
            );

        }


        if (!right) {

            slot.classList.add(
                "edge-right"
            );

        }



        if (!top && !left) {

            slot.classList.add(
                "corner-top-left"
            );

        }


        if (!top && !right) {

            slot.classList.add(
                "corner-top-right"
            );

        }


        if (!bottom && !left) {

            slot.classList.add(
                "corner-bottom-left"
            );

        }


        if (!bottom && !right) {

            slot.classList.add(
                "corner-bottom-right"
            );

        }

    });

}



function isSelected(
    dayIndex,
    minutes
) {

    if (
        dayIndex < 0 ||
        dayIndex >= days.length
    ) {

        return false;

    }


    return selectedCalendarAvailability.has(
        days[dayIndex] +
        "|" +
        minutes
    );

}


function formatTime(
    totalMinutes
) {

    let hour =
        Math.floor(
            totalMinutes / 60
        );


    const minute =
        totalMinutes % 60;


    const suffix =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        hour +
        ":" +
        String(minute).padStart(
            2,
            "0"
        ) +
        " " +
        suffix
    );

   }
function getAvailabilityData() {

    const result = [];


    days.forEach(day => {

        const selectedCalendar =
            Array.from(
                selectedCalendarAvailability
            )

            .filter(key =>
                key.startsWith(
                    day + "|"
                )
            )

            .map(key =>
                Number(
                    key.split("|")[1]
                )
            )

            .sort(
                (a, b) => a - b
            );


        if (
            selectedCalendar.length === 0
        ) {

            return;

        }


        let start =
            selectedCalendar[0];


        let previous =
            selectedCalendar[0];


        for (
            let i = 1;
            i < selectedCalendar.length;
            i++
        ) {

            const current =
                selectedCalendar[i];


  
            if (
                current !==
                previous + SLOT_MINUTES
            ) {

                result.push({

                    day,

                    start:
                        formatTime(
                            start
                        ),

                    end:
                        formatTime(
                            previous +
                            SLOT_MINUTES
                        )

                });


                start =
                    current;

            }


            previous =
                current;

        }


        result.push({

            day,

            start:
                formatTime(
                    start
                ),

            end:
                formatTime(
                    previous +
                    SLOT_MINUTES
                )

        });

    });


    return result;

}



function updateAvailabilitySummary() {

    const ranges =
        getAvailabilityData();


    if (
        ranges.length === 0
    ) {

        availabilitySummary.textContent =
            "No times selectedCalendar yet.";

        return;

    }


    availabilitySummary.innerHTML =
        "<strong>Available:</strong> " +

        ranges
            .map(range => {

                return (
                    range.day.slice(0, 3) +
                    " " +
                    range.start +
                    "–" +
                    range.end
                );

            })
            .join(" · ");

}




const subjectBank =
    document.getElementById("subjectBank");

const subjectChips =
    document.querySelectorAll(".subjectChip");

const subjectDropZones =
    document.querySelectorAll(".subjectDropZone");

let draggedSubject = null;


subjectChips.forEach(chip => {

    chip.addEventListener("dragstart", () => {

        draggedSubject = chip;

        chip.classList.add("dragging");

    });


    chip.addEventListener("dragend", () => {

        chip.classList.remove("dragging");

        draggedSubject = null;

    });

});



subjectDropZones.forEach(zone => {

    zone.addEventListener("dragover", event => {

        event.preventDefault();

        zone.classList.add("drag-over");

    });


    zone.addEventListener("dragleave", event => {


        if (!zone.contains(event.relatedTarget)) {

            zone.classList.remove("drag-over");

        }

    });


    zone.addEventListener("drop", event => {

        event.preventDefault();

        zone.classList.remove("drag-over");


        if (!draggedSubject) {
            return;
        }


        placeSubject(
            draggedSubject,
            zone
        );

    });

});


subjectBank.addEventListener(
    "dragover",
    event => {

        event.preventDefault();

    }
);


subjectBank.addEventListener(
    "drop",
    event => {

        event.preventDefault();

        if (!draggedSubject) {
            return;
        }



        if (
            draggedSubject.classList.contains(
                "placedSubject"
            )
        ) {

            const originalChip =
                document.querySelector(
                    `.subjectChip[data-subject="${draggedSubject.dataset.subject}"]`
                );


            if (originalChip) {

                originalChip.style.display =
                    "";

            }


            draggedSubject.remove();

        }


        updateSubjectData();

    }
);

function placeSubject(
    subject,
    destination
) {

    const subjectName =
        subject.dataset.subject;



    if (
        subject.classList.contains(
            "placedSubject"
        )
    ) {

        const oldZone =
            subject.closest(
                ".subjectDropZone"
            );


        if (oldZone) {

            subject.remove();

            restorePlaceholder(
                oldZone
            );

        }

    }



    const placed =
        document.createElement("div");


    placed.className =
        "placedSubject";


    placed.dataset.subject =
        subjectName;


    placed.textContent =
        subjectName;


    placed.draggable =
        true;



    placed.addEventListener(
        "dragstart",
        () => {

            draggedSubject =
                placed;

            placed.classList.add(
                "dragging"
            );

        }
    );


    placed.addEventListener(
        "dragend",
        () => {

            placed.classList.remove(
                "dragging"
            );

            draggedSubject =
                null;

        }
    );


    destination.appendChild(
        placed
    );



    const original =
        document.querySelector(
            `.subjectChip[data-subject="${subjectName}"]`
        );


    if (original) {

        original.style.display =
            "none";

    }



    const placeholder =
        destination.querySelector(
            ".dropPlaceholder"
        );


    if (placeholder) {

        placeholder.remove();

    }


    updateSubjectData();

}



function restorePlaceholder(zone) {

    if (
        !zone.querySelector(
            ".placedSubject"
        )
    ) {

        const placeholder =
            document.createElement("div");


        placeholder.className =
            "dropPlaceholder";


        placeholder.textContent =
            "Drop subjects here";


        zone.appendChild(
            placeholder
        );

    }

}


function updateSubjectData() {

    const result = {

        needHelp:
            getSubjects(
                "need-help"
            ),

        couldUseHelp:
            getSubjects(
                "could-use-help"
            ),

        comfortable:
            getSubjects(
                "comfortable"
            ),

        noHelp:
            getSubjects(
                "no-help"
            )

    };


    console.log(
        "Subject preferences:",
        result
    );




}


function getSubjects(category) {

    const zone =
        document.querySelector(
            `.subjectDropZone[data-category="${category}"]`
        );


    if (!zone) {
        return [];
    }


    return Array.from(
        zone.querySelectorAll(
            ".placedSubject"
        )
    ).map(
        subject =>
            subject.dataset.subject
    );

}

