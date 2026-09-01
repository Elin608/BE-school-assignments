interface Book {
    title: string;
    pages: number;

}
const myBook = {
    title: "Dune",
    pages: 412,

};
console.log('Dune has ' + myBook.pages + ' pages')


interface Teacher {
    name: string;
    subject: string;
}
interface Employee {
    id: number;
    email: string;
}
type schoolTeacher = Teacher & Employee;

const printTeacherinfo = (schoolTeacher: schoolTeacher) => {
    console.log(schoolTeacher);
};


printTeacherinfo({
    name: "Denniz",
    subject: "Math",
    id: 14,
    email: "Denniz@test.com"
});
