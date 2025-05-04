/* eslint-disable no-prototype-builtins */
const testArray = [
    {
        price: 100,
        quantity: 2,
        name: 'Item 1',
        advance: 50,
        id: 1,
        paymentHistory: '+50+100+50',
        paymentMethodHistory: '+cash+bank+bkash',
        delivered: true
    },
    {
        price: 200,
        quantity: 5,
        name: 'Item 2',
        advance: 50,
        id: 2,
        paymentHistory: '+500+100+400',
        paymentMethodHistory: '+bank+cash+nogod',
        delivered: true
    },
    {
        price: 150,
        quantity: 5,
        name: 'Item 2',
        advance: 50,
        id: 2,
        paymentHistory: '+200+100+200+50+200',
        paymentMethodHistory: '+cash+cash+bank+bkash+nogod',
        delivered: true
    },
]

const result = testArray.map(item => {
    const payments = item.paymentHistory.split('+').filter(Boolean).map(Number);
    const methods = item.paymentMethodHistory.split('+').filter(Boolean);

    const methodTotals = {
        cash: 0,
        bank: 0,
        bkash: 0,
        nogod: 0
    };

    for (let i = 0; i < payments.length; i++) {
        const method = methods[i];
        const amount = payments[i];
        if (method && methodTotals.hasOwnProperty(method)) {
            methodTotals[method] += amount;
        }
    }

    return {
        id: item.id,
        name: item.name,
        ...methodTotals,
        total: payments.reduce((a, b) => a + b, 0)
    };
});

console.log(result);