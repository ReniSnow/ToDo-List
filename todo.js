let List = $('#tdlApp ul');
    let Mask = 'tdl_';
    function showTasks() {
      let Storage_size = localStorage.length;
      if (Storage_size > 0) {
        for (let i = 0; i < Storage_size; i++) {
          let key = localStorage.key(i);
          if (key.indexOf(Mask) == 0) {
            $('<li></li>').addClass('tdItem')
              .attr('data-itemid', key)
              .text(localStorage.getItem(key))
              .appendTo(List);
          }
        }
      }
    }
    showTasks();
    $('#tdlApp input').on('keydown', function (e) {
      if (e.keyCode != 13) return;
      let str = e.target.value;
      e.target.value = "";
      if (str.length > 0) {
        let number_Id = 0;
        List.children().each(function (index, el) {
          let element_Id = $(el).attr('data-itemid').slice(4);
          if (element_Id > number_Id)
            number_Id = element_Id;
        })
        number_Id++;
        localStorage.setItem(Mask + number_Id, str);
        $('<li></li>').addClass('tdItem')
          .attr('data-itemid', Mask + number_Id)
          .text(str).appendTo(List);
      }
    });
    $(document).on('click', '.tdItem', function (e) {
      let jet = $(e.target);
      localStorage.removeItem(jet.attr('data-itemid'));
      jet.remove();
    })