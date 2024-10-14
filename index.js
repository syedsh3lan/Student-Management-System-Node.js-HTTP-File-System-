const http = require('http')
const fs = require('fs')

http.createServer(
    (req,res)=>{
        //add student
        if(req.url == '/addStudent' && req.method == 'POST'){
            let parseData = '';
            req.on('data' ,(chunk)=>{
                parseData = JSON.parse(chunk);
            })
            req.on('data', ()=>{
               const data = JSON.parse(fs.readFileSync('./student.json'))
               const isEmailExist = data.find(user=>user.email == parseData.email)
               if(isEmailExist){
                res.write('email is exist')
                return res.end()
               }
            data.push(parseData);
            fs.writeFileSync('./student.json',JSON.stringify(data));
            res.write('new student is add');
            res.end();
            })
            
        //get all student
        }else if(req.url == '/getAllStudent' && req.method == 'GET'){
            fs.readFile('./student.json',(err,data)=>{
                res.end(JSON.stringify(JSON.parse(data)))
            })
        //add course
        }else if(req.url == '/addCourse' && req.method == 'POST'){
            let parseData = '';
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk);
            })
            req.on('data',()=>{
                const data = JSON.parse(fs.readFileSync('./course.json'))
                const idISExist = data.find(id=>id.id == parseData.id);
                if(idISExist){
                    res.write('id is exist')
                   return res.end()
                }
                data.push(parseData);
                fs.writeFileSync('./course.json',JSON.stringify(data))
                res.write('new course add')
                res.end()
            })


        }else if(req.url == '/getAllCourse' && req.method == 'GET'){
            fs.readFile('./course.json',(err,data)=>{
                res.end(JSON.stringify(JSON.parse(data)))
            })
        }else if(req.url == '/addDepartment' && req.method == 'POST'){
            let parseData='';
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk)
            })
            req.on('data',()=>{
                const data =JSON.parse(fs.readFileSync('./department.json'))
                const idIsExist = data.find(id=>id.id == parseData.id)
                if(idIsExist){
                    res.write('id is exist');
                    return res.end();
                }
                data.push(parseData);
                fs.writeFileSync('./department.json',JSON.stringify(data))
                res.write('new department add');
                res.end();
            })

        }else if(req.url == '/getAllDepartment' && req.method == 'GET'){
            fs.readFile('./department.json',(err,data)=>{
                res.end(JSON.stringify(JSON.parse(data)))

            })

        }else if (req.url == '/deleteStudent' && req.method == 'DELETE'){
            let parseData = "";
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk);
            })
            req.on('data', ()=>{
                const data = JSON.parse(fs.readFileSync('./student.json'))
                const idExist = data.find(user=>user.id == parseData.id)
                if(idExist){
                    data.splice(idExist , 1);
                    fs.writeFileSync('./student.json',JSON.stringify(data));
                    res.write('delete student done');
                    return res.end();
                   
                }
                res.write('id not found');
                res.end()
               
            
            })
        }else if (req.url == '/deleteCourse' && req.method == 'DELETE'){
            let parseData =''
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk)
            })
            req.on('data',()=>{
                const data = JSON.parse(fs.readFileSync('./course.json'))
                const courseExist = data.find(user=>user.name == parseData.name)
                if(courseExist){
                    data.splice(courseExist,1)
                    fs.writeFileSync('./course.json',JSON.stringify(data))
                    res.write('delete course done');
                    return res.end();
                }
                res.write('course not found');
                res.end()
            })
        }else if (req.url == '/deleteDepartment' && req.method == 'DELETE'){
            let parseData =''
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk)
            })
            req.on('data',()=>{
                const data = JSON.parse(fs.readFileSync('./department.json'))
                const departmentExist = data.find(user=>user.name == parseData.name)
                if(departmentExist){
                    data.splice(departmentExist,1)
                    fs.writeFileSync('./department.json',JSON.stringify(data))
                    res.write('delete department done');
                    return res.end();
                }
                res.write('department not found');
                res.end()
            })
        }else if (req.url == '/updateStudent' && req.method == 'PUT') {
            let parsedData = '';
            
            req.on('data', (chunk) => {
                parsedData = JSON.parse(chunk)
            });
        
            req.on('end', () => {
               
                const studentData = JSON.parse(fs.readFileSync('./student.json'));
        
                const studentIndex = studentData.findIndex(student => student.id === parsedData.id);
        
                if (studentIndex !== -1) {
                    for (const key in parsedData) {
                        if (key !== 'id') {
                            studentData[studentIndex][key] = parsedData[key];
                        }
                    }
        
                    fs.writeFileSync('./student.json', JSON.stringify(studentData));
        
                    res.write('Student updated successfully');
                    res.end();
                } else {
                    res.write('Student not found');
                    res.end();
                }
            });
        }else if (req.url == '/updateCourse' && req.method == 'PUT'){
            let parsedData = '';
            
            req.on('data', (chunk) => {
                parsedData = JSON.parse(chunk)
            });
            req.on('end', () => {
               
                const courseData = JSON.parse(fs.readFileSync('./course.json'));
        
                const courseIndex = courseData.findIndex(student => student.id === parsedData.id);
        
                if (courseIndex !== -1) {
                    for (const key in parsedData) {
                        if (key !== 'id') {
                            courseData[courseIndex][key] = parsedData[key];
                        }
                    }
        
                    fs.writeFileSync('./course.json', JSON.stringify(courseData));
        
                    res.write('course updated successfully');
                    res.end();
                } else {
                    res.write('course not found');
                    res.end();
                }
            });
        }else if (req.url == '/updateDepartment' && req.method == 'PUT'){
            let parsedData = '';
            
            req.on('data', (chunk) => {
                parsedData = JSON.parse(chunk)
            });
            req.on('end', () => {
               
                const departmentData = JSON.parse(fs.readFileSync('./department.json'));
        
                const departmentIndex = departmentData.findIndex(student => student.id === parsedData.id);
        
                if (departmentIndex !== -1) {
                    for (const key in parsedData) {
                        if (key !== 'id') {
                            departmentData[departmentIndex][key] = parsedData[key];
                        }
                    }
        
                    fs.writeFileSync('./department.json', JSON.stringify(departmentData));
        
                    res.write('department updated successfully');
                    res.end();
                } else {
                    res.write('department not found');
                    res.end();
                }
            });
        }else if(req.url == '/getStudentWithID' && req.method == 'GET'){
            let parseData =''
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk)
            })
            req.on('data',()=>{
                let data = JSON.parse(fs.readFileSync('./student.json'));
                let studentExist = data.find(user=>user.id == parseData.id)
                
               if(studentExist){
                return res.end(JSON.stringify(studentExist))
    
               }
               res.write('student not found');
               res.end()
            })                      
        }else if(req.url == '/getCourseWithName' && req.method == 'GET'){
            let parseData = '';
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk);
            })
            req.on('data', ()=>{
                const data = JSON.parse(fs.readFileSync('./course.json'))
                const courseExist = data.find(user=>user.name == parseData.name)
                if(courseExist){
                    return res.end(JSON.stringify(courseExist))
                }
                res.write('course not found');
                res.end()
            })

            

        }else if(req.url == '/getDepartmentWithName' && req.method == 'GET'){
            let parseData = '';
            req.on('data',(chunk)=>{
                parseData = JSON.parse(chunk);
            })
            req.on('data', ()=>{
                const data = JSON.parse(fs.readFileSync('./department.json'))
                const departmentExist = data.find(user=>user.name == parseData.name)
                if(departmentExist){
                    return res.end(JSON.stringify(departmentExist))
                }
                res.write('department not found');
                res.end()
            })

            

        }else if (req.url === '/getStudentsWith-D-C' && req.method === 'GET') {
            // Read data from files
            const students = JSON.parse(fs.readFileSync('./student.json'));
            const departments = JSON.parse(fs.readFileSync('./department.json'));
            const courses = JSON.parse(fs.readFileSync('./course.json'));
    
            
            const studentsWith_D_C = students.map(student => {
                
                const department = departments.find(user => user.id === student.departmentId);
                if (department) {
                    
                    const departmentCourses = courses.filter(course => course.departmentId === department.id);
                    return {
                        ...student,
                        department: department,
                        courses: departmentCourses
                    };
                } else {
                    return {
                        ...student,
                        department: null,
                        courses: []
                    };
                }
            });
            res.end(JSON.stringify(studentsWith_D_C));
        }                  
        else {
            res.write('page not found')
            res.end()
          }
    }
    

).listen(6000,()=> console.log('server done'))