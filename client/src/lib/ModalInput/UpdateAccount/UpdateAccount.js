import React, { useEffect, useState } from "react";
import "./UpdateAccount.css";
import Logo from "../../../assets/image/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateAccount = (props) => {
    let date = new Date().toLocaleDateString();
    const REACT_APP_API_ENDPOINT = "https://blue-school-project.herokuapp.com/";
    const [allValuesAdmin, setAllValuesAdmin] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [adminError, setAdminError] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [allValuesTeacher, setAllValuesTeacher] = useState({
        name: "",
        age: "",
        gender: null,
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        img: null,
    });
    const [teacherError, setTeacherError] = useState({
        name: false,
        age: false,
        gender: false,
        phone: false,
        email: false,
        password: false,
        confirmPassword: false,
        img: false,
    });
    const [avatar, setAvatar] = useState(Logo);

    const [allValuesParents, setAllValuesParents] = useState({
        name: "",
        dateOfBirth: `${date.split("/")[2]}-${
            date.split("/")[0] < 10
                ? "0" + date.split("/")[0]
                : date.split("/")[0]
        }-${
            date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
        }`,
        address: "",
        phone: "",
        gender: null,
        job: "",
        email: "",
        password: "",
        confirmPassword: "",
        img: null,
    });
    const [parentsError, setParentsError] = useState({
        name: false,
        dateOfBirth: false,
        address: false,
        phone: false,
        gender: false,
        job: false,
        email: false,
        password: false,
        confirmPassword: false,
        img: false,
    });

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const toDataURL = (url) =>
        fetch(url)
            .then((response) => response.blob())
            .then(
                (blob) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    })
            );

    useEffect(() => {
        if (props.dropValue === "admin") {
            AccountService.getAccountsAdminById(props.AccountId).then((res) =>
                setAllValuesAdmin({
                    name: res.alladmin.admin_username,
                    email: res.alladmin.admin_email,
                    password: "",
                    confirmPassword: "",
                })
            );
        } else if (props.dropValue === "teacher") {
            AccountService.getAccountsTeacherById(props.AccountId).then(
                (res) => {
                    !!res.teacher.teacher_img
                        ? setAvatar(
                              `${REACT_APP_API_ENDPOINT}${res.teacher.teacher_img}`
                          )
                        : setAvatar(Logo);
                    setAllValuesTeacher({
                        name: res.teacher.teacher_name,
                        age: res.teacher.teacher_age,
                        gender: `${res.teacher.teacher_gender}`,
                        phone: res.teacher.teacher_phone,
                        email: res.teacher.teacher_email,
                        password: "",
                        confirmPassword: "",
                        img: null,
                    });
                }
            );
        } else if (props.dropValue === "parents") {
            AccountService.getAccountsParentsById(props.AccountId).then(
                (res) => {
                    !!res.parent.parent_img
                        ? setAvatar(
                              `${REACT_APP_API_ENDPOINT}${res.parent.parent_img}`
                          )
                        : setAvatar(Logo);
                    setAllValuesParents({
                        name: res.parent.parent_name,
                        dateOfBirth:
                            res.parent.parent_dateofbirth.split("T")[0],
                        address: res.parent.parent_address,
                        job: res.parent.parent_job,
                        gender: `${res.parent.parent_gender}`,
                        phone: res.parent.parent_phone,
                        email: res.parent.parent_email,
                        password: "",
                        confirmPassword: "",
                        img: null,
                    });
                }
            );
        }
    }, []);

    const handleUpdateAdminAccount = () => {
        let check = false;
        let name = false;
        let email = false;
        let password = false;
        let confirmPassword = false;
        if (allValuesAdmin.name.length > 30 || allValuesAdmin.name.length < 2) {
            name = true;
            check = true;
        } else name = false;
        if (validateEmail(allValuesAdmin.email) === false) {
            email = true;
            check = true;
        } else email = false;
        if (allValuesAdmin.password.length < 6) {
            password = true;
            check = true;
        } else if (allValuesAdmin.confirmPassword != allValuesAdmin.password) {
            confirmPassword = true;
            check = true;
        } else {
            (password = false), (confirmPassword = false);
        }

        setAdminError({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValuesAdmin);
        }
    };

    const handleUpdateTeacherAccount = () => {
        let name = false;
        let age = false;
        let gender = false;
        let phone = false;
        let email = false;
        let password = false;
        let confirmPassword = false;
        let img = false;

        let check = false;
        if (
            allValuesTeacher.name.length > 30 ||
            allValuesTeacher.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        if (validateEmail(allValuesTeacher.email) === false) {
            email = true;
            check = true;
        } else email = false;

        if (allValuesTeacher.password.length < 6) {
            password = true;
            check = true;
        } else if (
            allValuesTeacher.confirmPassword != allValuesTeacher.password
        ) {
            confirmPassword = true;
            check = true;
        } else {
            (password = false), (confirmPassword = false);
        }

        if (
            isNaN(parseInt(allValuesTeacher.age)) ||
            allValuesTeacher.age.length > 3
        ) {
            age = true;
            check = true;
        } else age = false;

        console.log(allValuesTeacher.gender);
        if (allValuesTeacher.gender == null) {
            gender = true;
            check = true;
        } else gender = false;

        if (
            isNaN(parseInt(allValuesTeacher.phone)) ||
            allValuesTeacher.phone.length != 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        if (!!allValuesTeacher.img) {
            let imgList = allValuesTeacher.img.name.split(".");
            if (
                imgList[imgList.length - 1] != "png" &&
                imgList[imgList.length - 1] != "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        setTeacherError({
            name: name,
            age: age,
            gender: gender,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            img: img,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValuesTeacher);
        }
    };

    const handleUpdateParentsAccount = () => {
        let name = false;
        let dateOfBirth = false;
        let address = false;
        let phone = false;
        let gender = false;
        let job = false;
        let email = false;
        let password = false;
        let confirmPassword = false;
        let img = false;

        let check = false;
        if (
            allValuesParents.name.length > 30 ||
            allValuesParents.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        if (validateEmail(allValuesParents.email) === false) {
            email = true;
            check = true;
        } else email = false;

        if (allValuesParents.password.length < 6) {
            password = true;
            check = true;
        } else if (
            allValuesParents.confirmPassword != allValuesParents.password
        ) {
            confirmPassword = true;
            check = true;
        } else {
            (password = false), (confirmPassword = false);
        }

        let dateNow = new Date().toLocaleDateString();

        let dateConvert = `${dateNow.split("/")[2]}-${
            dateNow.split("/")[0] < 10
                ? "0" + dateNow.split("/")[0]
                : dateNow.split("/")[0]
        }-${
            dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
        }`;

        if (dateConvert < allValuesParents.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValuesParents.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (
            isNaN(parseInt(allValuesParents.phone)) ||
            allValuesParents.phone.length != 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        if (!!allValuesParents.img) {
            let imgList = allValuesParents.img.name.split(".");
            if (
                imgList[imgList.length - 1] != "png" &&
                imgList[imgList.length - 1] != "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        if (
            allValuesParents.address.length > 150 ||
            allValuesParents.address.length < 2
        ) {
            address = true;
            check = true;
        } else address = false;

        if (
            allValuesParents.job.length > 100 ||
            allValuesParents.job.length < 2
        ) {
            job = true;
            check = true;
        } else job = false;

        setParentsError({
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            img: img,
            job: job,
            address: address,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValuesParents);
        }
    };

    const clickUpdate = (e) => {
        e.preventDefault();
        if (props.dropValue === "admin") handleUpdateAdminAccount();
        else if (props.dropValue === "teacher") handleUpdateTeacherAccount();
        else handleUpdateParentsAccount();
    };

    const changeHandler = (e) => {
        setAllValuesAdmin({
            ...allValuesAdmin,
            [e.target.name]: e.target.value,
        });
        e.target.focus;
    };

    const FormAccountAdmin = (
        <div className="form-admin-content">
            <h2>Update admin account</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Account already exists
            </label>
            <input
                value={allValuesAdmin.name}
                id="input-name"
                type="text"
                name="name"
                placeholder="Name"
                onChange={changeHandler}
                required
            />
            <label
                className={
                    "error" +
                    (adminError.name ? " error-show" : " error-hidden")
                }
            >
                Name must be less than 30 chars long
            </label>
            <input
                id="input-email"
                type="email"
                name="email"
                placeholder="Email"
                value={allValuesAdmin.email}
                onChange={changeHandler}
            />
            <label
                className={
                    "error" +
                    (adminError.email ? " error-show" : " error-hidden")
                }
            >
                Invalid Email
            </label>
            <input
                value={allValuesAdmin.password}
                id="input-password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
            />
            <label
                className={
                    "error" +
                    (adminError.password ? " error-show" : " error-hidden")
                }
            >
                Password must be at least 6 chars long
            </label>

            <input
                value={allValuesAdmin.confirmPassword}
                id="input-password-confirm"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
            />
            <label
                className={
                    "error" +
                    (adminError.confirmPassword
                        ? " error-show"
                        : " error-hidden")
                }
            >
                Password incorrect
            </label>
        </div>
    );

    const changeHandlerTeacher = (e) => {
        setAllValuesTeacher({
            ...allValuesTeacher,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerTeacherIMG = (e) => {
        setAllValuesTeacher({
            name: allValuesTeacher.name,
            age: allValuesTeacher.age,
            gender: allValuesTeacher.gender,
            phone: allValuesTeacher.phone,
            email: allValuesTeacher.email,
            password: allValuesTeacher.password,
            confirmPassword: allValuesTeacher.confirmPassword,
            img: e.target.files[0],
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };
    const FormAccountTeacher = (
        <div className="form-admin-content">
            <h2>Add Account Teacher</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Account already exists
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerTeacherIMG}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.img
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            The selected file is not valid
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesTeacher.name}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Age</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="age"
                            placeholder="Enter age"
                            value={allValuesTeacher.age}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.age
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid age
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Gender</h4>
                        <div className="radio-btn">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value="true"
                                    name="gender"
                                    onChange={changeHandlerTeacher}
                                    checked={allValuesTeacher.gender === "true"}
                                />
                                Male
                                <input
                                    checked={
                                        allValuesTeacher.gender === "false"
                                    }
                                    type="radio"
                                    value="false"
                                    name="gender"
                                    onChange={changeHandlerTeacher}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (teacherError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No gender selected
                            </label>
                        </div>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Phone Number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={allValuesTeacher.phone}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.phone
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Phone must be 10 numeric characters
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Email</h4>
                        <input
                            className="input-content"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={allValuesTeacher.email}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.email
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Email
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="password"
                            placeholder="Enter password "
                            value={allValuesTeacher.password}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.password
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password must be at least 6 chars long
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Confirm Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter password "
                            value={allValuesTeacher.confirmPassword}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.confirmPassword
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password incorrect
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const changeHandlerParents = (e) => {
        setAllValuesParents({
            ...allValuesParents,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerParentsIMG = (e) => {
        setAllValuesParents({
            name: allValuesParents.name,
            dateOfBirth: allValuesParents.dateOfBirth,
            address: allValuesParents.address,
            job: allValuesParents.job,
            gender: allValuesParents.gender,
            phone: allValuesParents.phone,
            email: allValuesParents.email,
            password: allValuesParents.password,
            confirmPassword: allValuesParents.confirmPassword,
            img: e.target.files[0],
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountParents = (
        <div className="form-admin-content">
            <h4>Update Parents account</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Account already exists
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerParentsIMG}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.img
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            The selected file is not valid
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesParents.name}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date of Birth</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Date Of Birth"
                            value={allValuesParents.dateOfBirth}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.dateOfBirth
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid birthday
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Gender</h4>
                        <div className="radio-btn">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value={true}
                                    name="gender"
                                    onChange={changeHandlerParents}
                                    checked={allValuesParents.gender === "true"}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerParents}
                                    checked={
                                        allValuesParents.gender === "false"
                                    }
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (parentsError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No gender selected
                            </label>
                        </div>
                    </div>
                    <div className="type-input">
                        <h4>Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            placeholder="Enter address"
                            value={allValuesParents.address}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Address must be less than 150 chars
                        </label>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Job</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="job"
                            placeholder="Enter job"
                            value={allValuesParents.job}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.job
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Job must be less than 100 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Phone Number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={allValuesParents.phone}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.phone
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Phone must be 10 numeric characters
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Email</h4>
                        <input
                            className="input-content"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={allValuesParents.email}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.email
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Email
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="password"
                            placeholder="Enter password "
                            value={allValuesParents.password}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.password
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password must be at least 6 chars long
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Confirm Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter password "
                            value={allValuesParents.confirmPassword}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.confirmPassword
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password incorrect
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const FormUpdateAccount = (
        <div className="form-add-account">
            {props.dropValue === "admin"
                ? FormAccountAdmin
                : props.dropValue === "teacher"
                ? FormAccountTeacher
                : FormAccountParents}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickUpdate} className="btn-ok">
                Update
            </button>
        </div>
    );

    return <div className="add-account-form">{FormUpdateAccount}</div>;
};

export default UpdateAccount;
