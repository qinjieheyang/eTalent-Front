//  gulp jest --tests "moment-convert-data*,*Form11*"

import   moment from "moment";
// moment.prototype.toJSON = function() {
//     return moment(this).format("YYYY-MM-DD HH:mm:ss");
// };

Date.prototype.toJSON = function() {
    return moment(this).format("YYYY-MM-DD HH:mm:ss");
};

test("moment-convert-date", () => {
    const d = new Date(2000, 1, 1, 1, 1, 1, 1);
    const m = moment.utc(d);
    expect(m.toDate()).toEqual(d);
});

test("moment-convert-date-yyyymmdd", () => {
    const d = new Date(2000, 1, 1);
    const m = moment.utc(d);
    expect(m.toDate()).toEqual(new Date(2000, 1, 1));
});

test("moment-convert-DateToJson", () => {
    const d = new Date(2000, 0, 1, 1, 1, 1, 1);

    expect(d.toJSON()).toEqual("2000-01-01 01:01:01");
});
