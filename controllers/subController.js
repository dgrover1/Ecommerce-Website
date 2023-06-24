import subscriberModel from "../models/subscriberModel.js";
export const subController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        const exisitingUser = await subscriberModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Subscribed ",
            });
        }
        const user = await new subscriberModel({
            email
        }).save();

        res.status(201).send({
            success: true,
            message: "User Subscribed Successfully",
            user,
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in subscribing',
            error
        })
    }
};
