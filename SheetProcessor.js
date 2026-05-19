function removeMeasures(fileString,numBefore,numHidden,numAfter){
    let parser = new DOMParser();
    let newdom = parser.parseFromString(fileString,"text/xml");
    const measureCount = newdom.getElementsByTagName("part")[0].getElementsByTagName("measure").length;
    let start = null;
    if (measureCount >= (numBefore+numHidden+numAfter)){
        start = Math.floor(Math.random()*(measureCount-(numBefore+numHidden+numAfter))) + numBefore;
    }
    else{
        return "INSUFFICIENT FILE LENGTH";
    }
    for (let p = 0; p < newdom.getElementsByTagName("part").length; p++){
        let toRemove = [];
        for (let i = 0; i < start-numBefore; i++){
            let thisMeasure = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i];
            toRemove.push(thisMeasure);
        }
        for (let i = measureCount-1; i >= start+numHidden+numAfter; i--){
            let thisMeasure = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i];
            toRemove.push(thisMeasure);
        }
        for (let i = start; i < start+numHidden; i++){
            newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].querySelectorAll("direction").forEach(dir => newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].removeChild(dir));
            for (let j = 0; j < newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note").length;j++){
                const note = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[i].getElementsByTagName("note")[j];
                const bannedChildren = [];
                bannedChildren.push(note.querySelectorAll("pitch"));
                bannedChildren.push(note.querySelectorAll("stem"));
                bannedChildren.push(note.querySelectorAll("beam"));
                bannedChildren.push(note.querySelectorAll("accidental"));
                bannedChildren.push(note.querySelectorAll("notations"));
                bannedChildren.push(note.querySelectorAll("lyric"));
                bannedChildren.push(note.querySelectorAll("chord"));
                bannedChildren.forEach(bannedGroup => bannedGroup.forEach(bannedChild => note.removeChild(bannedChild)));
                let preRest = note.getElementsByTagName("rest")
                if (preRest.length < 1){
                    let rest = newdom.createElement("rest");
                    note.appendChild(rest);
                }
            }
        }
        let pieceInfo = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[0].getElementsByTagName("attributes")[0];
        newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[start-numBefore].appendChild(pieceInfo);
        newdom.getElementsByTagName("part")[p].getElementsByTagName("measure")[start-numBefore].prepend(pieceInfo);
        for (let i = 0; i < toRemove.length; i++){
            newdom.getElementsByTagName("part")[p].removeChild(toRemove[i]);
        }
        remainingMeasures = newdom.getElementsByTagName("part")[p].getElementsByTagName("measure");
        for (let i = 0; i < numBefore + numHidden + numAfter; i++){
            remainingMeasures[i].setAttribute("number",i+1);
        }
    }
    let serializer = new XMLSerializer()
    let finaldom = serializer.serializeToString(newdom)
    return finaldom;
}