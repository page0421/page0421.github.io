function handleSubmit(form) {
  const formData = new FormData(form);
  const channel = formData.get("channel");
  const content = formData.get("content");
  const contact = formData.get("contact");
  if (channel.length < 2) {
    return false;
  }
  if (!(content.length >= 15 && content.length <= 500)) {
    return false;
  }

  const payload = `from=Web&content=${encodeURIComponent(`【${channel}】${content}`)}`;
  if (contact.length > 5) {
    payload += `&contact=${encodeURIComponent(contact)}`;
  }

  fetch("https://uapi.woobx.cn/misc/feedback", {
    method: "POST",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: payload,
  })
  .then(res => res.json())
  .then(res => {
      if(Reflect.has(res, "retCode") && Reflect.has(res, "code") && res.code === 200 && res.retCode === 0) {
        alert("反馈成功");
      } else if(Reflect.has(res, "retCode") && Reflect.has(res, "code") && res.code !== 200 && res.retCode !== 0) {
        alert(res.message);
      } else {
        alert("反馈出错");
      }
      return false;
  });

  return false;
}
