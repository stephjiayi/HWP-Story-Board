var app = window.app || {};

app.shell = (function(window) {
  /**
   * VIEWS CONTROLLERS
   */

  /**
   * 2-About
   */
  var aboutController = function() {
    app.views.about.bind('ageChanged', function(value) {
      wealthApp.model.update('aboutAge', value);
    });
    app.views.about.bind('incomeChanged', function(value) {
      wealthApp.model.update('aboutIncome', value);
      PubSub.publish('aboutIncomeChanged', value);
      var moneyValues = wealthApp.model.updateMoneyValues();
      PubSub.publish('moneyValuesChanged', moneyValues);
    });
    app.views.about.bind('situationChanged', function(value) {
      wealthApp.model.update('aboutSituation', value);
    });
    app.views.about.bind('livingChanged', function(value) {
      wealthApp.model.update('aboutLiving', value);
    });
  };

  /**
   * 3-You
   */
  var youController = function() {
    app.views.you.bind('basicNeedsChanged', function(basicRate, savingRate) {
      wealthApp.model.update('aboutBasicRate', basicRate);
      wealthApp.model.update('aboutSavingsRate', savingRate);
      wealthApp.model.updateMoneyValues();
    });
    app.views.you.bind('expensesChanged', function(expensesRate, savingRate) {
      wealthApp.model.update('aboutDiscretionaryRate', expensesRate);
      wealthApp.model.update('aboutSavingsRate', savingRate);
      wealthApp.model.updateMoneyValues();
    });
  };

  /**
   * 5-Pyramid
   */
  var pyramidSubscriber = function(topic, data) {
    if(topic === 'aboutIncomeChanged') {
      app.views.pyramid.configModule({
        aboutIncome: data
      });
    } else if(topic === 'moneyValuesChanged') {
      app.views.pyramid.configModule(data);
    }
    app.views.pyramid.updateLabels();
  };

  var pyramidController = function() {
    PubSub.subscribe('aboutIncomeChanged', pyramidSubscriber);
    PubSub.subscribe('moneyValuesChanged', pyramidSubscriber);
  };

  /**
   * 6-Scenarios
   */
  var scenariosSubscriber = function(topic, data) {
    if(topic === 'aboutIncomeChanged') {
      app.views.scenarios.configModule({savings: data});
      app.views.scenarios.calculateSeries();
      app.views.scenarios.setSlider('income', data);
      app.views.scenarios.updateLineChart();
    }
  };

  var scenariosController = function() {
    PubSub.subscribe('aboutIncomeChanged', scenariosSubscriber);
  };

  /**
   * 7-Goal
   */
  var goalController = function() {
    app.views.goal.bind('goalToggled', function(goal) {
      wealthApp.model.toggleGoal(goal);
    });
  };

  /**
   * 8-Retirement
   */
  var retirementController = function() {
    app.views.retirement.bind('actionToggled', function(action) {
      wealthApp.model.toggleActions(action);
    });
  };

  var init = function() {
    var data = wealthApp.model.read();
    //Screen #2
    var aboutContainer = document.getElementsByClassName('about-wrapper')[0];
    app.views.about.configModule({
      ageOptions: {
        start: data.aboutAge
      },
      incomeOptions: {
        start: data.aboutIncome
      }
    });
    app.views.about.init(aboutContainer);
    aboutController();

    //Screen #3
    var youContainer = document.getElementsByClassName('you-wrapper')[0];
    app.views.you.configModule({
      income: data.aboutIncome
    });
    app.views.you.init(youContainer);
    youController();

    //Screen #5
    var pyramidContainer = document.getElementsByClassName('pyramid-wrapper')[0];
    app.views.pyramid.configModule({
      basicNeeds: data.basicNeeds,
      savings: data.savings,
      discretionaryExpenses: data.discretionaryExpenses,
      aboutIncome: data.aboutIncome
    });
    app.views.pyramid.init(pyramidContainer);
    pyramidController();

    //Screen #6
    var scenariosContainer = document.getElementsByClassName('scenarios-wrapper')[0];
    app.views.scenarios.configModule({
      savings: data.savings,
      savingRateOptions: {
        start: data.aboutSavingsRate
      },
      incomeOptions: {
        start: data.aboutIncome
      }
    });
    app.views.scenarios.init(scenariosContainer);
    scenariosController();

    //Screen #7
    var goalContainer = document.getElementsByClassName('goal-wrapper')[0];
    app.views.goal.init(goalContainer);
    goalController();

    //Screen #8
    var retirementContainer = document.getElementsByClassName('retirement-wrapper')[0];
    app.views.retirement.init(retirementContainer);
    retirementController();

    //Screen #9
    var planContainer = document.getElementsByClassName('plan-wrapper')[0];
    app.views.plan.init(planContainer);
  };

  return {
    init: init
  };

})(window);
