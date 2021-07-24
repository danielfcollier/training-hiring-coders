import User from '../models/User'
import Notifications from '../schema/notifications'

class NotificationController{
    async index(req, res){
        const checkListCollaborator = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            }
        })
        if(!checkListCollaborator){
            return res.status(401).json({error: 'Notificação disponível apenas para colaboradores'})
        }
        const notifications = await Notifications.find({
            user: req.userId
        }).sort({createdAt: 'desc'}).limit(20);

        return res.json(notifications)
    }
    async update(req, res){
        const notifications = await Notifications.findByIdAndUpdate(
            req.params.id,
            {read: true},
            {new: true},

        )
        return res.json(notifications)
    }
}

export default new NotificationController();