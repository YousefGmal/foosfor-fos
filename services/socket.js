let io

module.exports = {
    init : (server)=>{
        io = require('socket.io')(server,{
            cors:'*'
        })
        return io
    },
    getIo:()=>{
        if(!io) throw new Error('invalid io')

        return io
    }
}