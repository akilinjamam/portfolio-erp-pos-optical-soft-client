export const customCode = (purchasePrice) => {







    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth();
    const monthDate = date.getDate();
    const ddmmyy = `${monthDate}-${month}-${year}`

    const zero = '00000'
    const remaininZero = zero?.slice(purchasePrice?.length);
    const time = date.getTime();
    const modifiedTime = time?.toString()?.slice(0, 8)


    const newBarcode = `${modifiedTime}${remaininZero}${purchasePrice ? purchasePrice : ''}`




    // const alphabetMap = {
    //     '1': 'K',
    //     '2': 'E',
    //     '3': 'Y',
    //     '4': 'R',
    //     '5': 'G',
    //     '6': 'H',
    //     '7': 'N',
    //     '8': 'O',
    //     '9': 'D',
    //     '0': 'X'
    // };

    // let convertedString = '';
    // const salesPrice = updateProductData?.salesPrice ? updateProductData?.salesPrice.toString() : ' '
    // for (let digit of salesPrice) {
    //     // eslint-disable-next-line no-prototype-builtins
    //     if (alphabetMap.hasOwnProperty(digit)) {
    //         convertedString += alphabetMap[digit];
    //     } else {
    //         // If the digit is not mapped, keep it as is
    //         convertedString += digit;
    //     }
    // }

    // const generatedCode = `${convertedString}${updateProductData?.material?.slice(0, 1)}${updateProductData?.frameType?.slice(0, 1)}${updateProductData?.size?.slice(0, 1)}${updateProductData?.shape?.slice(0, 1)}${date.getTime()}`
    const generatedCode = newBarcode



    return { generatedCode, ddmmyy }
}