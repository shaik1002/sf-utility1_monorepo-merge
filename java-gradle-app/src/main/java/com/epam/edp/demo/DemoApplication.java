package com.epam.edp.demo;

public class DemoApplication {

    private static final int MAX_CLOSE_VALUE = 1;

    /* Given three ints, value1 value2 value3, return true if one of value2 or value3 is "close"
     * (differing from value1 by at most 1), while the other is "far", differing from
     * both other values by 2 or more. Note: Math.abs(num) computes the absolute
     * value of value1 number.
     */
    public boolean closeFar(int value1, int value2, int value3) {
        return (isClose(value1, value2) && isFar(value1, value2, value3)) ||
                (isClose(value1, value3) && isFar(value1, value3, value2));
    }

    private boolean isClose(int a, int b) {
        return Math.abs(a - b) <= MAX_CLOSE_VALUE;
    }

    private boolean isFar(int a, int b, int c) {
        return Math.abs(a - c) > MAX_CLOSE_VALUE && Math.abs(b - c) > MAX_CLOSE_VALUE;
    }
}
