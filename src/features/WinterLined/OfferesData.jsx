// 📁 offers.js
const offers = [
    {
        name: "ال3 كولون",
        count: 3,
        prices: {
            baby: 295,
            girls: 360,
        },
    },
    {
        name: "ال4 كولون",
        count: 4,
        prices: {
            baby: 360,
            girls: 460,
        },
    },
    {
        name: "ال6 كولون",
        count: 6,
        prices: {
            baby: 510,
            girls: 630,
        },
    },
    {
        name: "ال8 كولون",
        count: 8,
        prices: {
            baby: 660,
            girls: 780,
        },
    },
    {
        name: "ال10 كولون",
        count: 10,
        prices: {
            baby: 780,
            girls: 950,
        },
    },
    {
        name: "ال12 كولون",
        count: 12,
        prices: {
            baby: 900,
            girls: 1080,
        },
    },
];

// توضيح الفئات العمرية
export const AGE_GROUPS = {
    baby: "من حديثي الولادة حتى 9 شهور 👶",
    girls: "من سنتين حتى 14 سنة 🎀",
};

export default offers;