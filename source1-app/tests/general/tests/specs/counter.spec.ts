import { createApp } from "@/index";
import { Fort } from "fortjs";
import { CounterScheduler } from "@/crons/counter";

describe("counter scheduler", () => {
    beforeAll(async () => {
        await createApp();
    });

    const taskName = "Counter";


    it("get invalid class task", async () => {
        try {
            const task = Fort.scheduler.getTaskInputByName("taskName");
        } catch (error) {
            expect(error.message).toEqual("Cron task taskName is not registered.");
        }
    })

    it("get valid class task", async () => {
        const task = Fort.scheduler.getTaskInputByName(taskName);
        expect(task.name).toEqual(taskName);
    })

    it("get invalid task", async () => {
        try {
            const task = Fort.scheduler.getTask("taskName");
        } catch (error) {
            expect(error.message).toEqual("Cron task taskName does not exist");
        }
    })

    it("value check", async () => {
        const task = Fort.scheduler.getTask(taskName);
        expect(task['counter']).toEqual(0);
    })

    it("value check after 5 second", async () => {
        const task = Fort.scheduler.getTask<CounterScheduler>(taskName);
        await new Promise((res) => {
            setTimeout(res, 2000);
        })
        expect(task.counter).toEqual(2);
        await new Promise((res) => {
            setTimeout(res, 2000);
        })
        expect(task.counter).toEqual(4);
    })

    it("check for error", async () => {
        const logSpy = jest.spyOn(Fort.logger, "error");
        const task = Fort.scheduler.getTask<CounterScheduler>(taskName);
        await new Promise((res) => {
            setTimeout(res, 2000);
        })
        expect(task.counter).toEqual(6);
        expect(logSpy).toHaveBeenCalledWith('Error thrown on 5');
        logSpy.mockRestore();
    })

    afterAll(() => {
        return Fort.destroy();
    });
})