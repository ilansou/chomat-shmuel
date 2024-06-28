import { HDate } from "@hebcal/core";

// Array to translate English month names to Hebrew
const monthTranslations = {
    "Tishrei": "תשרי",
    "Cheshvan": "חשון",
    "Kislev": "כסלו",
    "Tevet": "טבת",
    "Shevat": "שבט",
    "Adar": "אדר",
    "Adar I": "אדר א",
    "Adar II": "אדר ב",
    "Nisan": "ניסן",
    "Iyyar": "אייר",
    "Sivan": "סיוון",
    "Tammuz": "תמוז",
    "Av": "אב",
    "Elul": "אלול"
};

export const getJewishDate = (date) => {
    let hdate = new HDate(date);

    let hebrewDay = convertToHebrewDay(hdate.getDate());
    let hebrewYear = convertToHebrewYear(hdate.getFullYear());
    let hebrewMonth = translateMonth(hdate.getMonthName());

    let jewishDate = `${hebrewDay} ${hebrewMonth} ${hebrewYear}`;

    return jewishDate;
};

// Function to convert numeric day to Hebrew day format
const convertToHebrewDay = (day) => {
    const hebrewUnits = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
    const hebrewTens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];

    if (day <= 10 || day === 20 || day === 30) {
        return `${hebrewUnits[day]}'`;
    } else {
        let tens = Math.floor(day / 10);
        let units = day % 10;
        return `${hebrewTens[tens]}"${hebrewUnits[units]}`;
    }
};

// Function to translate month name to Hebrew
const translateMonth = (monthName) => {
    return monthTranslations[monthName] || monthName; // If translation exists, return Hebrew name; otherwise, return original name
};

// Function to convert numeric year to Hebrew letters
const convertToHebrewYear = (year) => {
    const hebrewThousands = ["", "א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ז'", "ח'", "ט'"];
    const hebrewHundreds = ["", "ק", "ר", "ש", "ת", "תק", "תר", "תש", "תת"];
    const hebrewTens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
    const hebrewUnits = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];

    let thousands = Math.floor(year / 1000);
    let hundreds = Math.floor((year % 1000) / 100);
    let tens = Math.floor((year % 100) / 10);
    let units = year % 10;

    let hebrewYear = `${hebrewThousands[thousands]}${hebrewHundreds[hundreds]}${hebrewTens[tens]}${hebrewUnits[units]}`;

    return hebrewYear.trim(); // Trim to remove any leading or trailing spaces
};




