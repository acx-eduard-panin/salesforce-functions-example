const sdk = require('@salesforce/salesforce-sdk');
const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param {import("@salesforce/salesforce-sdk").InvocationEvent} event:   represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param {import("@salesforce/salesforce-sdk").Context} context: represents the connection to Evergreen and your Salesforce org.
 * @param {import("@salesforce/salesforce-sdk").Logger} logger:  logging handler used to capture application logs and traces specific
 *                 to a given execution of a function.
 */
module.exports = async function (event, context, logger) {
	// Run SOQL query
	const id = event.data;
	const results = await context.org.data.query(`SELECT Id, Name, Phone FROM Account WHERE Id = ${id}`);
	logger.info(JSON.stringify(results));
	if (!results) {
		return;
	}

	const { totalSize, records } = results;
	logger.info(`Total Size: ${totalSize}`);
	logger.info(JSON.stringify(records));
	logger.info(records.length);
	if (records.length) {
		const [record] = records;
		await generateWordDoc(id, record, logger, context.org.unitOfWork);
	}
	return 'Document is generated';
}

const generateWordDoc = async (recordId, record, logger, uow) => {
	logger.info(`Generation is started: ${JSON.stringify(record)}`);
	return new Promise((resolve)=>{
		const doc = new PDFDocument();
		doc
			.fontSize(25)
			.text(`Account Name: ${record.Name}`, 100, 100);
		const stream = doc.pipe(fs.createWriteStream('sample.pdf'));
		doc.end();
		stream.on('finish', () => {
			logger.info('Generation is finished');
			fs.readFile('sample.pdf', async (error, file)=> {
				resolve(await saveFileAsAttachment(recordId, file.toString('base64'), uow, logger));
			})
		});
	});
}

const saveFileAsAttachment = async (recordId, body, uow, logger) => {
	try {
		const attachment = new sdk.SObject('Attachment');
		attachment.setValue('Name', 'Generated File.pdf');
		attachment.setValue('ParentId', recordId.replaceAll("'", ""));
		attachment.setValue('Body', body);
		logger.info(`Attachment constructed ${JSON.stringify(attachment)}`);
		uow.registerNew(attachment);
		const result = await uow.commit();
		logger.info('Attachment committed');
		return result;
	} catch (error) {
		logger.info(`Error: ${JSON.stringify(error)}`);
		return `Attachment creation failed. Details: ${JSON.stringify(error)}`;
	}
}
