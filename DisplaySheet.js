function displayMXL(divID,mxlContent){
    const fileBlob = new Blob([mxlContent],{ type:'text/xml' });
    const url = URL.createObjectURL(fileBlob);
    var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(divID);
    osmd.setOptions({
        drawTitle: true,
        compacttight: true,
        drawsubtitle: false,
        drawPartNames: false
    });
    osmd.load(url).then(
        function(){
            osmd.render();
        }
    );
}