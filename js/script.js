'use strict';

function ready() {
  var result = document.getElementById('result'),
      message = document.getElementById('message'),
      reset = document.getElementById('reset'),
      table = document.getElementById('tableId'),
      sum = new SumCells();

  function SumCells() {
    this.sumItems = 0;
    var that = this;
    var selectedTd;
    
    table.onclick = function(event) {
      var target = event.target; 
      
      if (target.tagName != 'TD') return; 
         
      hideMessage();
      setHighlight(target);
      
      var value = target.innerHTML;
      
      if (isNumeric(value)) { 
        that.sumItems += +value;
        that.sumItems = +that.sumItems.toFixed(10);
        result.innerHTML = that.sumItems;
      } else {
        showMessage('Значение не является числовым!');
      }
    };
    
    reset.onclick = function() {
      hideMessage();             
      removeHighlight();
      that.sumItems = 0;
      result.innerHTML = that.sumItems; 
     };
    
    /*
     * Возвращает true, если value число. 
     * В противном случае возвращает false
     *
     * @param value Значение для проверки.
     */
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
    
    /*
     * Скрывает информационное сообщение.
     * Необходимо для скрытия сообщения о 
     * не корректных данных для суммирования.
     */
    function hideMessage() {
      if (message.style.display != 'none') {   
        message.innerHTML = '';        
        message.style.display = 'none';
      } 
    }

    /*
     * Отображает информационное сообщение text.
     *
     * @param test Текст сообщения.
     */
    function showMessage(text) {
      if (message.style.display != 'block') {   
        message.innerHTML = text;
        message.style.display = 'block';
      }  
    }

    /*
     * Удаление подсветки выьранной ячейки 
     */
    function removeHighlight() {
      if (selectedTd) {
        selectedTd.classList.remove('highlight');
      }
    }
    
    /*
     * Установка подсветки выбранной ячейки node 
     *
     * @param node Выбранный элемент TD.
     */
    function setHighlight(node) {
      removeHighlight();
      selectedTd = node;
      selectedTd.classList.add('highlight');
    }
  }
}

document.addEventListener("DOMContentLoaded", ready);
