import db from "../models/index";

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn','valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn','valueVi'] }
                ],
                raw: false,
                nest: true
            });

            for (let user of users) {
                if (user.image) {
                    user.image = Buffer.from(user.image, 'binary').toString('base64');
                }
            }
            resolve({
                errCode: 0,
                data: users
            });
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome
}