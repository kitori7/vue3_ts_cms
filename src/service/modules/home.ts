import hyRequest from "..";

interface I {
  length: number;
}
//业务请求模块
hyRequest
  .request({
    url: "",
  })
  .then((res) => {
    console.log(res.data);
  });
