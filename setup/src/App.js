import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [data, setData] = useState([]); //porque es un array vacio?
  const [load, setLoad] = useState(true);
  const [value, setValue] = useState(0);
  const getData = async () => {
    try {
      const response = await fetch(url);
      const dat = await response.json();
      setData(dat);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (load) {
    return (
      <>
        <div className="section">
          <h2 className="title">...Loading</h2>
        </div>
      </>
    );
  }
  const { title, dates, duties, company } = data[value]; //se pasa la info de solo un objeto en la list, este esta elegido con el value
  return (
    <>
      <section className="section">
        <div className="title">
          <h2>Experience</h2>
          <div className="underline"></div>
        </div>
        <div className="jobs-center">
          <div className="btn-container">
            {data.map((item, index) => {
              return (
                <button
                  className={`job-btn ${index === value && "active-btn"}`}
                  key={item.id}
                  onClick={() => setValue(index)} //se cambia el valor del value, se lo setea al index del btn
                >
                  {item.company}
                </button>
              );
            })}
          </div>
          <article className="job-info">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {duties.map((dut, a) => {
              return (
                <div className="job-desc" key={a}>
                  <FaAngleDoubleRight />
                  <p>{dut}</p>
                </div>
              );
            })}
          </article>
        </div>
        <button className="btn">more info</button>
      </section>
    </>
  );
}

export default App;
