function removeMeasures(fileString,numBefore,numHidden,numAfter){
    let parser = new DOMParser();
    let newdom = parser.parseFromString(fileString,"text/xml");
    const measureCount = newdom.getElementsByTagName("part")[0].getElementsByTagName("measure").length;
    let start = null;
    if (measureCount >= (numBefore+numHidden+numAfter)){
        start = Math.floor(Math.random()*(measureCount-(numBefore+numHidden+numAfter))) + numBefore;
    }
    else{
        return "INSUFFICIENT FILE LENGTH"
    }
    for (let p = 0; p < newdom.getElementsByTagName("part").length; p++){
        for (let i = 0; i < start-numBefore; i++){
            for (let j = 0; j < newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note").length;j++){
                let note = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note")[j];
                let pitch = note.getElementsByTagName("pitch")[0];
                if (pitch) {
                    note.removeChild(pitch);
                }
                let rest = newdom.createElement("rest");
                note.appendChild(rest);
            }
        }
        for (let i = measureCount-1; i >= start+numHidden+numAfter; i--){
            for (let j = 0; j < newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note").length;j++){
                let note = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note")[j];
                let pitch = note.getElementsByTagName("pitch")[0];
                if (pitch) {
                    note.removeChild(pitch);
                }
                let rest = newdom.createElement("rest");
                note.appendChild(rest);
            }
        }
        for (let i = start; i < start+numHidden; i++){
            for (let j = 0; j < newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note").length;j++){
                let note = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note")[j];
                let pitch = note.getElementsByTagName("pitch")[0];
                if (pitch) {
                    note.removeChild(pitch);
                }
                let rest = newdom.createElement("rest");
                note.appendChild(rest);
            }
        }
    }
    let serializer = new XMLSerializer()
    let finaldom = serializer.serializeToString(newdom)
    return finaldom;
}