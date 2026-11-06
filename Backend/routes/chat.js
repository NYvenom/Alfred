import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/test", async(req, res) => {
    try{
        const thread = new Thread({
            threadId: "XYZ",
            title: "Test Thread",
        });

        const response = await thread.save();
        res.send(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Failed to Save in Database" });
    }
});

router.get("/threads", async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.send(threads);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Failed to Fetch Threads" });
    }
})

router.get("/threads/:threadId", async(req, res) => {
    const { threadId } = req.params;
    
    try{
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            res.status(404).json({error: "Thread not found"});
        }

        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Failed to Fetch Chat" });
    }
})

router.delete("/threads/:threadId", async(req, res) => {
    const { threadId } = req.params;
    
    try{
        const deletedThread = await Thread.findByIdAndDelete(threadId);

        if(!deletedThread) {
            res.status(404).json({error: "Thread not Found"});
        }

        res.status(200).json({success: "Thread Deleted Successfully"})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Failed to Delete Thread" });
    }
})

router.post("/chat", async(req, res) => {
    const { threadId, message } = req.body;

    if(!threadId || !message) {
        res.status(404).json({ error: "Missing required fields" })
    }
    
    try{
        const thread = await Thread.findOne({threadId});
        if(!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
        } else {
            thread.messages.push({role: "user", content: message});
        }
        const assistantReply = getOpenAIAPIResponse(message);

        thread.message.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Something went wrong"});
    }
})

export default router;