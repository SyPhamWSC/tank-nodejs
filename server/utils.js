'use strict';

function overlapRect(t1x1, t1y1, t1x2, t1y2, t2x1, t2y1, t2x2, t2y2) {
        if (t1x2<t2x1) return false;
        if (t1x1>t2x2) return false;
        if (t1y2<t2y1) return false;
        if (t1y1>t2y2) return false;
        return true;
    }
function randNum(from, to) {
        return Math.floor(Math.random()*(to-from))+from;
}

module.exports = {
    overlapRect: overlapRect,
    randNum: randNum
};