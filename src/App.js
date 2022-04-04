import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let inittodo;
  if (localStorage.getItem("urls") === null) {
    inittodo = [];
  } else {
    inittodo = JSON.parse(localStorage.getItem("urls"));
  }

  const [url, seturl] = useState(inittodo);
  const [Status, setStatus] = useState();

  //https://xd.adobe.com/view/ec2566bf-21c5-4851-adab-90b41575541a-b976/

  const add = () => {

    let val = document.getElementById("url").value;
    console.log(val);

    let sno;
    if (url.length === 0) {
      sno = 0;
    } else {
      sno = url[url.length - 1].sno + 1;
    }

    const mytodo = {
      sno: sno,
      link: val,
      title: "Title",
    };

    seturl([...url, mytodo]); 
  };

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(url)); //setting data in localstorage after converting object into string
  }, [url]); //will run everytime when the url state changes

  const checkStatus = async (x, elem) => {
    console.log(x);
    console.log(elem);
    // elem.style.color="red !important !important"
    elem.classList.add("active");

    // var request = new XMLHttpRequest();
    // request.open("GET",'https://github.com/KygoSkyrus/weather-app.github.io/blob/master/src/Extend/Fourth.js',true)
    // request.send();
    // request.onload=function(){
    //   var st=request.status;
    //   console.log(st)
    //}

    // const resu = await fetch(x,{method:"HEAD"});
    // console.log(resu)

    await fetch(x).then((res) => {
      console.log(res);
      if (!res) {
        setStatus("ERROR");
        console.log("err");
      } else {
        setStatus("LIVE");
        console.log("llll");
      }
    });
  };

  return (
    <div className="App">
      <div
        className="d-flex justify-content-between align-items-center px-5 py-4 top"
        style={{ borderBottom: "1px solid #cecece" }}
      >
        <h3 className="m-0 fs-5">
          <b>LIVE WEBSITE TRACKING</b>
        </h3>
        <h4 className="m-0 fs-6">CURRENTLY TRACKING {url.length} WEBSITES</h4>
      </div>

      <div className="px-5 py-4" style={{}}>
        <div className="d-flex justify-content-between align-items-center col-lg-12 ">
          <input
            type="url"
            className="form-control me-2"
            placeholder="ENTER URL HERE"
            id="url"
            required
          />

          <button className="col-lg-3 btn" onClick={()=>add()}>
            ADD WEBSITE
          </button>
        </div>

        <section className="my-4 cb">WEBSITES</section>

        {url.map((todo) => {
          return (
            <div className="py-1" key={todo.sno}>
              <div
                className="d-flex justify-content-between align-items-center m-2 "
                onClick={(e) => checkStatus(todo.link, e.target)}
                style={{ borderBottom: "1px solid #cecece" }}
              >
                <div className="zindx">
                  <h4 className="mt-4">{todo.title}</h4>
                  <p className="link">{todo.link}</p>
                </div>
                <section className="statusBtn ">{Status}</section>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
