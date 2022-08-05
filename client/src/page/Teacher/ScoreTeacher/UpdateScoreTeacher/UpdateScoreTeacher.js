import React, { useEffect, useState } from "react";
import "./UpdateScoreTeacher.css";

const UpdateScoreTeacher = (props) => {
  const [score, setScore] = useState({
    score_ratio1: "",
    score_ratio2: "",
    score_ratio3: "",
  });
  const [scoreError, setScoreError] = useState({
    score_ratio1: false,
    score_ratio2: false,
    score_ratio3: false,
  });
  const [type, setType] = useState("");
  const [ids, setIds] = useState({
    idSubject: "",
    idStudent: "",
    idScore: "",
  });

  useEffect(() => {
    setInitValue();
  }, []);

  const setInitValue = () => {
    let score_ratio1 = "";
    let score_ratio2 = "";
    let score_ratio3 = "";

    const subject = props.student.student.detail.find((a) => {
      return a.subject._id == props.student.idSubject;
    });

    score_ratio1 = subject.subject.score_id.score_ratio1
      .toString()
      .replaceAll(",", "-");
    score_ratio2 = subject.subject.score_id.score_ratio2
      .toString()
      .replaceAll(",", "-");
    score_ratio3 = subject.subject.score_id.score_ratio3
      .toString()
      .replaceAll(",", "-");

    setScore({
      score_ratio1: score_ratio1,
      score_ratio2: score_ratio2,
      score_ratio3: score_ratio3,
    });

    if (!!subject.subject.score_id._id) {
      setType("PUT");
    } else setType("POST");

    setIds({
      idSubject: props.student.idSubject,
      idStudent: props.student.student.id,
      idScore: subject.subject.score_id._id,
    });
  };

  const clickSave = (e) => {
    e.preventDefault();
    let check = false;
    let score_ratio1 = false;
    let score_ratio2 = false;
    let score_ratio3 = false;

    const arr1 = score.score_ratio1.split("-");
    let anError1 = false;
    for (let i = 0; i < arr1.length; i++) {
      if (
        arr1[i].length == 0 ||
        isNaN(parseFloat(arr1[i])) ||
        parseFloat(arr1[i]) > 10
      ) {
        anError1 = true;
      }
    }
    if (score.score_ratio1.length == 0 || anError1) {
      score_ratio1 = true;
      check = true;
    } else score_ratio1 = false;

    const arr2 = score.score_ratio2.split("-");
    let anError2 = false;
    for (let i = 0; i < arr2.length; i++) {
      if (
        arr2[i].length == 0 ||
        isNaN(parseFloat(arr2[i])) ||
        parseFloat(arr2[i]) > 10
      ) {
        anError2 = true;
      }
    }
    if (score.score_ratio2.length == 0 || anError2) {
      score_ratio2 = true;
      check = true;
    } else score_ratio2 = false;
    if (
      score.score_ratio3.length == 0 ||
      isNaN(parseFloat(score.score_ratio3))||
      parseFloat(score.score_ratio3) > 10
    ) {
      score_ratio3 = true;
      check = true;
    } else score_ratio3 = false;

    setScoreError({
      score_ratio1: score_ratio1,
      score_ratio2: score_ratio2,
      score_ratio3: score_ratio3,
    });
    if (!check) {
      props.handleConfirmUpdateScore(score, ids, type);
    }
  };

  const changeHandler = (e) => {
    setScore({
      ...score,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-update-score">
      <h1>Nguyen Thi Meo</h1>
      <div>
        <h6>Subject</h6>
        <h3>English</h3>
      </div>
      <div>
        <div>
          <p>Factor 1</p>
          <input
            value={score.score_ratio1}
            type="text"
            name="score_ratio1"
            placeholder="e.g: 8.8-10-5"
            onChange={changeHandler}
            required
          />
          <label
            className={
              "error" +
              (scoreError.score_ratio1 ? " error-show" : " error-hidden")
            }
          >
            You enter wrong (e.g: 8.8-7-9.3).
          </label>
        </div>
        <div>
          <p>Factor 2</p>
          <input
            value={score.score_ratio2}
            type="text"
            name="score_ratio2"
            placeholder="e.g: 8.8-10-5"
            onChange={changeHandler}
            required
          />
          <label
            className={
              "error" +
              (scoreError.score_ratio2 ? " error-show" : " error-hidden")
            }
          >
            You enter wrong (e.g: 8.8-7-9.3).
          </label>
        </div>
        <div>
          <p>Factor 3</p>
          <input
            value={score.score_ratio3}
            type="text"
            name="score_ratio3"
            placeholder="Enter a number"
            onChange={changeHandler}
            required
          />
          <label
            className={
              "error" +
              (scoreError.score_ratio3 ? " error-show" : " error-hidden")
            }
          >
            You enter wrong! Try again.
          </label>
        </div>
      </div>
      <div className="btn-handle-change">
        <button onClick={props.handleInputCustom} className="btn-cancel">
          Cancel
        </button>
        <button type="submit" onClick={clickSave} className="btn-ok">
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateScoreTeacher;
