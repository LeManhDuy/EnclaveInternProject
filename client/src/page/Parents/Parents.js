import React, { useEffect, useState } from "react";
import "./Parents.css";
import Logo from "../../assets/image/Logo.png";
import ParentsService from "../../config/service/ParentsService";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../lib/ModalInput/ModalInput";
import FormAddProtector from "./FormAddProtector/FormAddProtector";
import Loading from "../../lib/Loading/Loading";

const Parents = () => {
    const REACT_APP_API_ENDPOINT = "https://blue-school-project.herokuapp.com/";
    const [parentsInfo, setParentsInfo] = useState({
        parent_img: "",
        parent_name: "",
        parent_email: "",
        parent_phone: "",
        parent_job: "",
        parent_dateofbirth: "",
        parent_gender: "",
        parent_address: "",
    });
    const [protectorInfo, setProtectorInfo] = useState([]);
    const [id, setId] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [state, setState] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInfoParents();
        getProtectors();
    }, [state]);

    const getInfoParents = () => {
        const response = ParentsService.getInfoParents();
        let parentsImg = "";
        if (!!response.parent.parent_img) {
            parentsImg = `${REACT_APP_API_ENDPOINT}${response.parent.parent_img}`;
        } else parentsImg = Logo;
        setParentsInfo({
            parent_img: parentsImg,
            parent_name: response.parent.parent_name,
            parent_email: response.parent.parent_email,
            parent_phone: response.parent.parent_phone,
            parent_job: response.parent.parent_job,
            parent_dateofbirth: response.parent.parent_dateofbirth,
            parent_gender: response.parent.parent_gender,
            parent_address: response.parent.parent_address,
        });
    };

    const getProtectors = () => {
        setIsLoading(true);
        ParentsService.getProtectorByParentsId(
            ParentsService.getInfoParents().parent._id
        )
            .then((response) => {
                const dataSources = response.protectors.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        protector_name: item.protector_name,
                        protector_address: item.protector_address,
                        protector_phone: item.protector_phone,
                        protector_relationship: item.protector_relationship,
                    };
                });
                setProtectorInfo(dataSources);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const ParentsContent = ({ parentsInfo }) => (
        <div className="parents-item">
            <div className="image">
                <img src={parentsInfo.parent_img} />
                <div className="type parents-name">
                    <div className="text">
                        <h3>{parentsInfo.parent_name}</h3>
                    </div>
                </div>
            </div>
            <div className="detail-info">
                <div className="type parents-email">
                    {/* <i class="fa fa-solid fa-envelope"></i> */}
                    <div className="text">
                        <p>Email</p>
                        <p>{parentsInfo.parent_email}</p>
                    </div>
                </div>
                <div className="type parents-phone">
                    {/* <i className="fa fa-phone"></i> */}
                    <div className="text">
                        <p>Phone Number</p>
                        <p>{parentsInfo.parent_phone}</p>
                    </div>
                </div>
                <div className="type parents-dateOfBirth">
                    {/* <i class="fa fa-solid fa-cake-candles"></i> */}
                    <div className="text">
                        <p>Date of birth</p>
                        <p>
                            {new Date(
                                parentsInfo.parent_dateofbirth
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="type parent-job">
                    {/* <i className="fa fa-suitcase" aria-hidden="true"></i> */}
                    <div className="text">
                        <p>Job</p>
                        <p>{parentsInfo.parent_job}</p>
                    </div>
                </div>
                <div className="type parents-gender">
                    {/* <i class="fa fa-solid fa-mars-and-venus"></i> */}
                    <div className="text">
                        <p>Gender</p>
                        <p>{parentsInfo.parent_gender ? "Male" : "Female"}</p>
                    </div>
                </div>
                <div className="type parents-address">
                    {/* <i className="fa fa-solid fa-location-dot"></i> */}
                    <div className="text">
                        <p>Address</p>
                        <p>{parentsInfo.parent_address}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        ParentsService.deleteProtectorByIdProtector(id)
            .then((res) => {
                if (res.success) {
                    setIsDelete(false);
                    setState(!state);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const onClickDeleteProtector = (e) => {
        const id = e.target.parentElement.getAttribute("data-key");
        setId(id);
        setIsDelete(true);
    };

    const handleCreateProtector = () => {
        setIsCreate(true);
    };

    const handleInputCustom = () => {
        setIsCreate(false);
    };

    const handleConfirmAddProtector = (Values) => {
        ParentsService.createProtectorByParentsId(
            ParentsService.getInfoParents().parent._id,
            {
                protector_name: Values.protector_name,
                protector_address: Values.protector_address,
                protector_phone: Values.protector_phone,
                protector_relationship: Values.protector_relationship,
            }
        )
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setIsCreate(false);
                } else {
                    setIsCreate(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const DivAddProtector = (
        <ModalInput
            show={isCreate}
            handleInputCustom={handleInputCustom}
            content={
                <FormAddProtector
                    handleInputCustom={handleInputCustom}
                    isCreate={isCreate}
                    handleConfirmAddProtector={handleConfirmAddProtector}
                />
            }
        />
    );

    const ProtectorInfo = ({ protectorInfo }) =>
        protectorInfo.map((item) => (
            <div className="protector-item" key={item.key} data-key={item.id}>
                <div className="detail-info">
                    <div className="type protector-name">
                        <i className="fas fa-child"></i>
                        <div className="text">
                            <p>Protector Name</p>
                            <p>{item.protector_name}</p>
                        </div>
                    </div>
                    <div className="type protector-relationship">
                        <i className="fa fa-suitcase" aria-hidden="true"></i>
                        <div className="text">
                            <p>Relationship</p>
                            <p>{item.protector_relationship}</p>
                        </div>
                    </div>
                    <div className="type protector-phone">
                        <i className="fa fa-phone"></i>
                        <div className="text">
                            <p>Phone Number</p>
                            <p>{item.protector_phone}</p>
                        </div>
                    </div>
                    <div className="type protector-address">
                        <i className="fa fa-solid fa-location-dot"></i>
                        <div className="text">
                            <p>Address</p>
                            <p>{item.protector_address}</p>
                        </div>
                    </div>
                </div>
                <button className="btn-cancel" onClick={onClickDeleteProtector}>
                    Delete
                </button>
            </div>
        ));

    return (
        <div className="parents-info">
            <h3>PARENT INFORMATION</h3>
            <div className="parents-content">
                <ParentsContent parentsInfo={parentsInfo} />
                <h3>PROTECTOR INFORMATION</h3>
                <div className="protectors">
                    <ProtectorInfo protectorInfo={protectorInfo} />
                </div>
            </div>
            <div class="btn">
                <button id="btnAdd" onClick={handleCreateProtector}>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    Add Protector
                </button>
            </div>
            {isCreate ? DivAddProtector : null}
            {isDelete ? ConfirmDelete : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default Parents;
