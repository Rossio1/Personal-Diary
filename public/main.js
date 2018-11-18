var edit = document.getElementsByClassName('fa-edit')
var trash = document.getElementsByClassName("fa-trash");
const parent = document.getElementById('modal')

Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerHTML
        let input = document.createElement('input')
        let textarea = document.createElement('textarea')
        let button = document.createElement('button')
        button.innerHTML = "Save"
        button.onclick = function(e){
          let diary = e.path[1].childNodes[0].innerText
          let name = e.path[1].childNodes[1].innerText
          console.log(e)
          console.log(diary)
          console.log(name)
          update(diary, name)
        }
        textarea.innerHTML = msg
        console.log(msg)
        input.value = name
        parent.append(textarea)
        parent.append(input)
        parent.append(button)
        parent.classList.add('show')
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerHTML
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


function update(diary, name){
  fetch('messages', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': name,
      'msg': diary
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
}
