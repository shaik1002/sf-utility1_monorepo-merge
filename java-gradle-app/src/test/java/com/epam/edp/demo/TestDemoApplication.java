package com.epam.edp.demo;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestDemoApplication {

    private DemoApplication demoApplication;

    @BeforeAll
    private void init() {
        demoApplication = new DemoApplication();
    }

    @Test
    public void testCloseFar() {
        assertFalse(demoApplication.closeFar(2, 4, 3), "Both too close.");
        assertTrue(demoApplication.closeFar(5, 2, 6), "Third is close, second is far.");
        assertFalse(demoApplication.closeFar(1, 6, -5), "Both too far.");
        assertTrue(demoApplication.closeFar(1, 2, 6), "Second is close, third is far.");
    }

}
