const shoppingMallData = {
    shops: [
        {
            width: 10,
            length: 5
        },
        {
            width: 15,
            length: 7
        },
        {
            width: 20,
            length: 5
        },
        {
            width: 8,
            length: 10
        }
    ],
    height: 5,
    moneyPer1m3: 30,
    budget: 50000
}

function volumeCount(width, length, height) {
    return width * length * height;
}

function isBudgetEnough(data) {
    let commonVolume = 0;
    let expensenOnShops = 0;

    for (let i = 0; i < data.shops.length; i++) {
        let {width, length} = data.shops[i];
        console.log(data.shops[i]);
        commonVolume += volumeCount(width, length, data.height);
    }
    expensenOnShops = commonVolume * 6;
    console.log(commonVolume, expensenOnShops, data.budget);
    if (expensenOnShops <= data.budget) {
        return "Бюджета достаточно";
    } else return "Бюджета недостаточно";
};

console.log(isBudgetEnough(shoppingMallData));