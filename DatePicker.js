'use strict';

function DatePicker(divId, callback) {
    this.divId = divId;
    this.callback = callback;
    this.date = new Date();
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  
  DatePicker.prototype.render = function(date) {
    this.date = date;
    var container = document.getElementById(this.divId);
    container.innerHTML = '';
  
    var calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    var prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.addEventListener('click', function() {
      this.renderPreviousMonth();
    }.bind(this));
    var nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', function() {
      this.renderNextMonth();
    }.bind(this));
    var monthYearText = document.createElement('span');
    monthYearText.textContent = this.monthNames[this.date.getMonth()] + ' ' + this.date.getFullYear();
    calendarHeader.appendChild(prevButton);
    calendarHeader.appendChild(monthYearText);
    calendarHeader.appendChild(nextButton);
    container.appendChild(calendarHeader);
  
    var calendarTable = document.createElement('table');
    calendarTable.className = 'table';
    var daysOfWeekRow = document.createElement('tr');
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function(day) {
      var dayCell = document.createElement('th');
      dayCell.textContent = day;
      daysOfWeekRow.appendChild(dayCell);
    });
    calendarTable.appendChild(daysOfWeekRow);
  
    var firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var lastDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    var startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
    while (startDate <= lastDayOfMonth) {
      var weekRow = document.createElement('tr');
      for (var i = 0; i < 7; i++) {
        var dayCell = document.createElement('td');
        dayCell.textContent = startDate.getDate();
        dayCell.addEventListener('click', function(clickedDate) {
            if (clickedDate.getMonth() === this.date.getMonth()) {
                this.callback(this.divId, {
                    month: clickedDate.getMonth() + 1,
                    day: clickedDate.getDate(),
                    year: clickedDate.getFullYear()
                });
            }
        }.bind(this, new Date(startDate)), false);
        
        if (startDate.getMonth() !== this.date.getMonth()) {
          dayCell.classList.add('other-month');
        }
        weekRow.appendChild(dayCell);
        startDate.setDate(startDate.getDate() + 1);
      }
      calendarTable.appendChild(weekRow);
    }
  
    container.appendChild(calendarTable);
  };
  
  DatePicker.prototype.renderPreviousMonth = function() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render(this.date);
  };
  
  DatePicker.prototype.renderNextMonth = function() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.render(this.date);
  };
  
  
  