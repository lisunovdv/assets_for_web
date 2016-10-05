var fs = require('fs');

var fileName = 'ss_db.sql';

var fileSize = fs.statSync(fileName)['size'];
var reader = new fs.ReadStream(fileName);
var writer = new fs.WriteStream('ready2.sql');
var count = 0;
var bufferSize = 65536;
var totalChunks = fileSize / bufferSize;

reader.on('readable', function () {
	var data = reader.read();
	if (data) {
		count++;
		console.log( ( (count*100) / totalChunks ).toFixed(2) + '%' );
		data = data.toString();
		data = data.replace('www.chytayka.com.ua', 'chytayka.loc');
		writer.write(data);
	}
});

writer.on('end', function () {
	writer.end('');
});

reader.on('error', function (err) {
	if (err.code == 'ENOENT') {
		console.log('File no found');
	} else {
		console.log(err);
	}
})

writer.on('error', function (err) {
	if (err.code == 'ENOENT') {
		console.log('File no found');
	} else {
		console.log(err);
	}
})
