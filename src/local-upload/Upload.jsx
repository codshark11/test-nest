import React,{useState, useEffect} from 'react'
import axios from 'axios';


const Upload = () => {
  const [taskName, setTaskName] = useState("");
  const [img, setNewImage] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [list, setList] = useState(() => {
    axios.get('http://localhost:3030/get_list')
          .then(res => {
            setList(res.data.result);
          })
    return [];
  });
  const [date, setDate] = useState(0);

  useEffect(() => {
    console.log(111);
    const getDate = async () => {
      const res = await axios.get('http://localhost:3030/get_list');
      const data = res.data.result;
      setList(data);
    }

    getDate();
  }, [date])

  const onSub=  (e)=>{
    setDate(new Date());
    axios.post('http://localhost:3030/upload', img)
          .then(res => {
          })
  }

  const set_image = (event) => {
    let file = event.target.files[0];
    let fileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append('taskName', taskName);
    setNewImage(formData);

    //preview the image

    let reader = new FileReader();

    reader.onload = function (r) {
      setPreviewImg(r.target.result);
    }
    reader.readAsDataURL(file);
  }

    return (
      <>
          <div className="box">
            <div className="">
              <div className="">
                <div className="col-lg-6 col-md-8 col-12 mx-auto" id="formdata">
                  <form onSubmit={onSub} >
                    <div className="form-group">
                      <label htmlFor="">Task Name : </label>
                      <input type="text" className="form-control" placeholder="Enter Task Name" id="email" name="task" value={taskName} onChange={(e)=>setTaskName(e.target.value)} required />
                    </div>
                    <div className="form-group">

                      <div className='row'>
                        <div className="col-md-5">
                          <img src={previewImg} width="200" height="200" alt="Empty image" />
                        </div>
                        <div className="col-md-7">
                          <label htmlFor="">Upload Task Image:</label>
                          <input type="file" name="imgfile" className="form-control"   onChange={(e)=>set_image(e)} required />
                        </div>
                      </div>
                      
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
                <div className="col-lg-10 col-md-8 col-12 mx-auto" id="task-list">
                  <div className='row'>
                  {
                    list && list.map((li) => {
                      return (
                        <div className='col-md-3'>
                          <div className="form-group">
                            <label htmlFor=""> {li.taskName} </label><br/>
                            <img src={`http://localhost:3030/public/uploads/${li.fileName}`} width={100} alt="" />
                          </div>
                        </div>
                      );
                    })
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
      </>
    )
}

export default Upload;
