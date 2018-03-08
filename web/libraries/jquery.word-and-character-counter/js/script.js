(function ($) {
  $("#tabs").tabs();
  $("body").fadeIn();

  $("#close").click(function () {
    $("#notice").effect("explode");
  });

  $("tr:even").addClass("alt");
  $("td").each(function () {
    $(this).attr("valign", "top");
  });
  $("tr").hover(function () {
    $(this).addClass("over");
  }, function () {
    $(this).removeClass("over");
  });

  // Examples
  $("#default_usage").counter();
  $("#default_usage_num_only").counter({
    "text": false
  });
  $("#charUp").counter({
    count: "up",
    goal: 10
  });
  $("#wordDown").counter({
    type: "word",
    goal: 20
  });

  $("#wordUp").counter({
    type: "word",
    goal: 20,
    count: "up"
  });

  $("#custom_msg").counter({
    msg: "words left before you fall into a pit of emptiness."
  });

  $("#keepCountingChar").counter({
    goal: "sky"
  });

  $("#keepCountingWord").counter({
    goal: "sky",
    type: "word",
    msg: "amazing words"
  });

  $("#translate_words").counter({
    goal: 10,
    type: "word",
    translation: "caracter palavra restante m&agrave;x"
  });
  $("#translate_char").counter({
    goal: 10,
    type: "word",
    count: "up",
    translation: "caracter palavra restante m&agrave;x"
  });
  $("#append-target").counter({
    append: false,
    target: "#append-here"
  });
  $("#myInput").counter({
    containerClass: "wrapper"
  });

  $("<span class='ui-icon ui-icon-newwin'>&nbsp;</span>").insertAfter($("a[target^='_blank']"));

  $("#contentEditable").counter({
    goal: 20
  });

})(jQuery);