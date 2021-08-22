const curawasm = require('cura-wasm')  
const wasmdefs = require('cura-wasm-definitions')

module.exports = {

    /**
     * Slice STL
     * @param req
     * @param res
     * @param next
     */
    slice: async (req, res, next) => {
        const slicer = new curawasm.CuraWASM({
            command: 'slice -j definitions/printer.def.json -o Model.gcode -s layer_height=0.06 -l Model.stl',
            definition: wasmdefs.resolveDefinition('ultimaker2'),
            transfer: true,
            verbose: false
        });


        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let file = req.files.file;

        var buffer = file.data; // Get buffer
        var stl = new ArrayBuffer(buffer.length); // Start transforming Buffer to ArrayBuffer
        var views = new Uint8Array(stl);
        for(var i = 0; i < buffer.length; ++i) {
            views[i] = buffer[i];
        }

        //Progress logger (Ranges from 0 to 100)
        slicer.on('progress', percent => {
            console.log(`Progress: ${percent}%`);
        });

        //Slice (This can take multiple minutes to resolve!)
        const { gcode } = await slicer.slice(stl, 'stl');

        const gcode64 = btoa(
            new Uint8Array(gcode)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );

        return res.json(gcode64)
    },

    /**
     * Get current user
     * @param req
     * @param res
     */
    profile: function (req, res) {
        return res.json(req.user.toJSON());
    }
};