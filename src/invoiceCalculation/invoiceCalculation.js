export const invoiceCalculation = (saleData) => {
    const allLeftZeros = '00000';
    const totalSalesLength = saleData?.result?.length?.toString()?.length;
    const dependentSalesLenght = totalSalesLength > 5 ? 5 : totalSalesLength
    const invoiceNumber = `${allLeftZeros.slice(0, (allLeftZeros?.length - dependentSalesLenght))}${saleData?.result?.length + 1}`

    return invoiceNumber
}
export const invoiceCalculationWithoutIncreament = (saleData) => {
    const allLeftZeros = '00000';
    const totalSalesLength = saleData?.result?.length?.toString()?.length;
    const dependentSalesLenght = totalSalesLength > 5 ? 5 : totalSalesLength
    const invoiceNumber = `${allLeftZeros.slice(0, (allLeftZeros?.length - dependentSalesLenght))}${saleData?.result?.length}`

    return invoiceNumber
}