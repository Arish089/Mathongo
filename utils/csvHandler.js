const csv = require('csv-parser')
const fs = require('fs')

const parseCSV = (file, list)=>{
    return new Promise((resolve, reject)=>{
        const users = []
        const errors = []

        const customProp = list.customProperties.reduce((map, prop)=>{
            map[prop.title] = prop.defaultValue
            return map
        },{});

        fs.createReadStream(file.path).pipe(csv())
        .on('data',(row)=>{
            const email = row.email;
            if(!email){
                errors.push({row: users.length + 2,message:"Email is required"});
                return;
            }

            const user = {
                name: row.name || '',
                email,
                properties: {...customProp },
                list: list._id
            };

            for(const key in row){
                if(customProp[key] !== undefined){
                    user.properties[key] = row[key] || customProp[key];
                }
            }
            users.push(user)
        })
        .on('end', ()=>{
            fs.unlink(file.path, ()=>{});
            resolve({users, errors});
        })
        .on('error', (error) => reject(error))
    })
} 

module.exports = parseCSV