
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const CertificateGenerator = () => {

    /*====================== Start of PDF Generator Function ======================*/

    const modifyPdf = async () => {

        /*Getting certificate path from shared folder*/
        const pdfPath = '/certificate.pdf'
        const existingPdfBytes = await fetch(pdfPath).then(res => res.arrayBuffer())
        //var bytes = new Uint8Array(existingPdfBytes)
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        /*Adding the fonts to the page*/
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const helvhelveticaFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const timesRomansBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
        const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

        /*Getting the first page of the PDF*/
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        /*Getting page dimentions and printing in console*/
        const pageWidth = firstPage.getWidth();
        const pageHeight = firstPage.getHeight();
        //const { pageWidth, pageHeight } = firstPage.getSize()
        console.log(pageWidth);
        console.log(pageHeight);



        /*=================== Adding QR Code ===================*/

        const QRCodeUrl = '/qrCode.png'
        const QRCodeImageBytes = await fetch(QRCodeUrl).then(res => res.arrayBuffer())

        const QRCodeImage = await pdfDoc.embedPng(QRCodeImageBytes)
        const QRCodeImageDims = QRCodeImage.scale(.09)

        firstPage.drawImage(QRCodeImage, {
            x: pageWidth * 0.775,
            y: pageHeight * 0.815,
            width: QRCodeImageDims.width,
            height: QRCodeImageDims.height,
        })



        /*=================== Student Name ===================*/
        const nameText = "Chittaranjan Saha";
        const nameTextFontSize = 30;

        /*Getting the width of the nameText string*/
        const nameTextTextWidth = helveticaFont.widthOfTextAtSize(nameText, nameTextFontSize);
        //const nameTextTextHeight = helveticaFont.heightAtSize(nameTextFontSize)

        firstPage.drawText(nameText, {
            x: (pageWidth - nameTextTextWidth) / 2,
            y: pageHeight / 2,
            size: nameTextFontSize,
            font: timesRomansBold,
            color: rgb(0.45, 0.12, 0.08)
        })


        /*=================== Certificate ID ===================*/
        const certificateIDText = "4972-FU108DB-2701";
        const certificateIDTextFontSize = 13;

        const certificateIDTextWidth = helveticaFont.widthOfTextAtSize(certificateIDText, certificateIDTextFontSize);

        firstPage.drawText(certificateIDText, {
            x: (pageWidth - certificateIDTextWidth) / 2 + 2,
            y: pageHeight * 0.813,
            size: certificateIDTextFontSize,
            font: helvhelveticaFontBold,
            color: rgb(0.45, 0.12, 0.08)
        })


        /*=================== Course Name ===================*/
        const courseNameText = ".NET - Full Stack Developer";
        const courseNameTextFontSize = 20;

        const courseNameTextWidth = helveticaFont.widthOfTextAtSize(courseNameText, courseNameTextFontSize);

        firstPage.drawText(courseNameText, {
            x: (pageWidth - courseNameTextWidth) / 2 - 5,
            y: pageHeight * 0.365,
            size: courseNameTextFontSize,
            font: helvhelveticaFontBold,
            color: rgb(0.45, 0.12, 0.08)
        })

        /*=================== Course Completion Date ===================*/
        const courseDateText = "18/09/2025";
        const courseDateTextFontSize = 20;

        const courseDateTextWidth = helveticaFont.widthOfTextAtSize(courseDateText, courseDateTextFontSize);

        firstPage.drawText(courseDateText, {
            x: (pageWidth - courseDateTextWidth) / 2 + 20,
            y: pageHeight * 0.315,
            size: courseNameTextFontSize,
            font: timesRomansBold,
            color: rgb(0.45, 0.12, 0.08)
        })


        /*Saving the modified URL and creating URL*/
        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        /*Creating a link to download*/
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificate.pdf';
        link.click();

        URL.revokeObjectURL(url);
    }

    /*====================== End of PDF Generator Function ======================*/

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black">
            <div className="w-full max-w-lg bg-gray-900/90 p-8 sm:py-16 text-center space-y-12 border border-gray-800 backdrop-blur-xl rounded-3xl 
                            shadow-[0_0_45px_rgba(255,170,0,0.15)] transition-all duration-300 hover:shadow-[0_0_65px_rgba(255,170,0,0.25)]">
                <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-sm">
                    Click to Generate Certificate
                </h1>

                <button
                    onClick={modifyPdf}
                    className="w-full px-6 py-4 rounded-xl font-semibold bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-900/40 hover:shadow-orange-600/50 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                >
                    Download Certificate
                </button>
            </div>
        </div>

    );
};

export default CertificateGenerator;