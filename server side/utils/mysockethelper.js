var mySocketHelper = {

    io: null,

    startSockets: (ioFromApp) => {

        this.io = ioFromApp;

        ioFromApp.on('connection', function (socket) {

            console.log('connected');

        });

    },

    sendMessgae: (msg) => {

        if (msg == "vacationsChange") {

            this.io.emit('vacationsChange', msg);

        }

        if (msg == "followersChange") {

            this.io.emit('followersChange', msg);

        }

    }

}

module.exports = mySocketHelper;