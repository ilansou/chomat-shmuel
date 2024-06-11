import { HDate, Event } from "@hebcal/core";

export const getJewishDate = (date) => {
    let hdate = new HDate(date);

    hdate = `${hdate.getDate()} ${hdate.getMonthName()} ${hdate.getFullYear()}`;

    return hdate;
};
