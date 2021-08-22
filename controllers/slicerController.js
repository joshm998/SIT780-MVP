const curawasm = require('cura-wasm')
const wasmdefs = require('cura-wasm-definitions');
const SlicedModel = require('../models/slicedModel');

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

        let file = req.files.modelFile;

        var buffer = file.data; // Get buffer
        var stl = new ArrayBuffer(buffer.length); // Start transforming Buffer to ArrayBuffer
        var views = new Uint8Array(stl);
        for (var i = 0; i < buffer.length; ++i) {
            views[i] = buffer[i];
        }

        //Progress logger (Ranges from 0 to 100)
        slicer.on('progress', percent => {
            console.log(`Progress: ${percent}%`);
        });

        //Slice (This can take multiple minutes to resolve!)
        const { gcode, metadata } = await slicer.slice(stl, 'stl');

        const gcode64 = btoa(
            new Uint8Array(gcode)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const device = new SlicedModel({
            name: req.body.name,
            gcode: gcode64,
            printer: 'Ultimaker 2',
            ownerId: req.user.id
          });
        

        device
        .save()
        .then(() => {
          res.redirect(`/`);
        })
        .catch((err) => {
          console.error(err);
        });
      
    },
};