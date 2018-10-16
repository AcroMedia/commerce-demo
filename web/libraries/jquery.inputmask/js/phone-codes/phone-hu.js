/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Hungarian Phone extension.
 */

!function (factory) {
    "function" == typeof define && define.amd ? define(["../inputmask"], factory) : "object" == typeof exports ? module.exports = factory(require("../inputmask")) : factory(window.Inputmask);
}(function (Inputmask) {
    return Inputmask.extendAliases({
        phonehu: {
            alias: "abstractphone",
            countrycode: "36",
            phoneCodes: [
                {mask: "+36(20)###-####", cc: "HU", cd: "Hungary", region: "", operator: "Telenor", desc: "Telenor mobiltelefon (számhordozás esetén más hálózat is lehet)"},
                {mask: "+36(21)###-####", cc: "HU", cd: "Hungary", region: "", operator: "Nomadikus", desc: "Nomadikus, vagyis nem helyhez kötött, internet alapú (VoIP) vezetékes telefonszámok"},
                {mask: "+36(30)###-####", cc: "HU", cd: "Hungary", region: "", operator: "T-Mobile", desc: "T-Mobile, vagy Bluemobile (Lidl) mobiltelefon (számhordozás esetén más hálózat is lehet)"},
                {mask: "+36(31)###-####", cc: "HU", cd: "Hungary", region: "", operator: "Tesco Mobile", desc: "Tesco Mobile mobiltelefon (számhordozás esetén más hálózat is lehet)"},
                {mask: "+36(40)###-####", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Kék szám – speciális elméletileg kedvezményes díjszabás ellenében hívható"},
                {mask: "+36(50)###-###", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Mobiltelefon szolgáltatás lesz"},
                {mask: "+36(51)###-###", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Internet hozzáférés szolgáltatás"},
                {mask: "+36(55)###-###", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Teszt körzet"},
                {mask: "+36(60)###-###", cc: "HU", cd: "Hungary", region: "", operator: "Westel450", desc: "Volt Westel450"},
                {mask: "+36(70)###-####", cc: "HU", cd: "Hungary", region: "", operator: "Vodafone", desc: "Vodafone mobiltelefon (számhordozás esetén más hálózat is lehet)"},
                {mask: "+36(80)###-###", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Zöld szám – ingyenesen hívható"},
                {mask: "+36(90)###-###", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Díjkorlát nélküli emelt díjas szolgáltatások"},
                {mask: "+36(91)###-###", cc: "HU", cd: "Hungary", region: "", operator: "", desc: "Díjkorlátos emelt díjas szolgáltatások"},
                {mask: "+36(1)###-####", cc: "HU", cd: "Hungary", region: "Budapest", operator: "", desc: ""},
                {mask: "+36(22)###-###", cc: "HU", cd: "Hungary", region: "Fejér megye", operator: "", desc: ""},
                {mask: "+36(23)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(24)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(25)###-###", cc: "HU", cd: "Hungary", region: "Fejér megye", operator: "", desc: ""},
                {mask: "+36(26)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(27)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(28)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(29)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(32)###-###", cc: "HU", cd: "Hungary", region: "Nógrád megye", operator: "", desc: ""},
                {mask: "+36(33)###-###", cc: "HU", cd: "Hungary", region: "Komárom-Esztergom megye", operator: "", desc: ""},
                {mask: "+36(34)###-###", cc: "HU", cd: "Hungary", region: "Komárom-Esztergom megye", operator: "", desc: ""},
                {mask: "+36(35)###-###", cc: "HU", cd: "Hungary", region: "Nógrád megye", operator: "", desc: ""},
                {mask: "+36(36)###-###", cc: "HU", cd: "Hungary", region: "Heves megye", operator: "", desc: ""},
                {mask: "+36(37)###-###", cc: "HU", cd: "Hungary", region: "Heves megye", operator: "", desc: ""},
                {mask: "+36(42)###-###", cc: "HU", cd: "Hungary", region: "Szabolcs-Szatmár-Bereg megye", operator: "", desc: ""},
                {mask: "+36(44)###-###", cc: "HU", cd: "Hungary", region: "Szabolcs-Szatmár-Bereg megye", operator: "", desc: ""},
                {mask: "+36(45)###-###", cc: "HU", cd: "Hungary", region: "Szabolcs-Szatmár-Bereg megye", operator: "", desc: ""},
                {mask: "+36(46)###-###", cc: "HU", cd: "Hungary", region: "Borsod-Abaúj-Zemplén megye", operator: "", desc: ""},
                {mask: "+36(47)###-###", cc: "HU", cd: "Hungary", region: "Borsod-Abaúj-Zemplén megye", operator: "", desc: ""},
                {mask: "+36(48)###-###", cc: "HU", cd: "Hungary", region: "Borsod-Abaúj-Zemplén megye", operator: "", desc: ""},
                {mask: "+36(49)###-###", cc: "HU", cd: "Hungary", region: "Borsod-Abaúj-Zemplén megye", operator: "", desc: ""},
                {mask: "+36(52)###-###", cc: "HU", cd: "Hungary", region: "Hajdú-Bihar megye", operator: "", desc: ""},
                {mask: "+36(53)###-###", cc: "HU", cd: "Hungary", region: "Pest megye", operator: "", desc: ""},
                {mask: "+36(54)###-###", cc: "HU", cd: "Hungary", region: "Hajdú-Bihar megye", operator: "", desc: ""},
                {mask: "+36(56)###-###", cc: "HU", cd: "Hungary", region: "Jász-Nagykun-Szolnok megye", operator: "", desc: ""},
                {mask: "+36(57)###-###", cc: "HU", cd: "Hungary", region: "Jász-Nagykun-Szolnok megye", operator: "", desc: ""},
                {mask: "+36(59)###-###", cc: "HU", cd: "Hungary", region: "Jász-Nagykun-Szolnok megye", operator: "", desc: ""},
                {mask: "+36(62)###-###", cc: "HU", cd: "Hungary", region: "Csongrád megye", operator: "", desc: ""},
                {mask: "+36(63)###-###", cc: "HU", cd: "Hungary", region: "Csongrád megye", operator: "", desc: ""},
                {mask: "+36(66)###-###", cc: "HU", cd: "Hungary", region: "Békés megye", operator: "", desc: ""},
                {mask: "+36(68)###-###", cc: "HU", cd: "Hungary", region: "Békés megye", operator: "", desc: ""},
                {mask: "+36(69)###-###", cc: "HU", cd: "Hungary", region: "Baranya megye", operator: "", desc: ""},
                {mask: "+36(72)###-###", cc: "HU", cd: "Hungary", region: "Baranya megye", operator: "", desc: ""},
                {mask: "+36(73)###-###", cc: "HU", cd: "Hungary", region: "Baranya megye", operator: "", desc: ""},
                {mask: "+36(74)###-###", cc: "HU", cd: "Hungary", region: "Tolna megye", operator: "", desc: ""},
                {mask: "+36(75)###-###", cc: "HU", cd: "Hungary", region: "Tolna megye", operator: "", desc: ""},
                {mask: "+36(76)###-###", cc: "HU", cd: "Hungary", region: "Bács-Kiskun megye", operator: "", desc: ""},
                {mask: "+36(77)###-###", cc: "HU", cd: "Hungary", region: "Bács-Kiskun megye", operator: "", desc: ""},
                {mask: "+36(78)###-###", cc: "HU", cd: "Hungary", region: "Bács-Kiskun megye", operator: "", desc: ""},
                {mask: "+36(79)###-###", cc: "HU", cd: "Hungary", region: "Bács-Kiskun megye", operator: "", desc: ""},
                {mask: "+36(82)###-###", cc: "HU", cd: "Hungary", region: "Somogy megye", operator: "", desc: ""},
                {mask: "+36(83)###-###", cc: "HU", cd: "Hungary", region: "Zala megye", operator: "", desc: ""},
                {mask: "+36(84)###-###", cc: "HU", cd: "Hungary", region: "Somogy megye", operator: "", desc: ""},
                {mask: "+36(85)###-###", cc: "HU", cd: "Hungary", region: "Somogy megye", operator: "", desc: ""},
                {mask: "+36(87)###-###", cc: "HU", cd: "Hungary", region: "Veszprém megye", operator: "", desc: ""},
                {mask: "+36(88)###-###", cc: "HU", cd: "Hungary", region: "Veszprém megye", operator: "", desc: ""},
                {mask: "+36(89)###-###", cc: "HU", cd: "Hungary", region: "Veszprém megye", operator: "", desc: ""},
                {mask: "+36(92)###-###", cc: "HU", cd: "Hungary", region: "Zala megye", operator: "", desc: ""},
                {mask: "+36(93)###-###", cc: "HU", cd: "Hungary", region: "Zala megye", operator: "", desc: ""},
                {mask: "+36(94)###-###", cc: "HU", cd: "Hungary", region: "Vas megye", operator: "", desc: ""},
                {mask: "+36(95)###-###", cc: "HU", cd: "Hungary", region: "Vas megye", operator: "", desc: ""},
                {mask: "+36(96)###-###", cc: "HU", cd: "Hungary", region: "Győr-Moson-Sopron megye", operator: "", desc: ""},
                {mask: "+36(99)###-###", cc: "HU", cd: "Hungary", region: "Győr-Moson-Sopron megye", operator: "", desc: ""}
            ]
        }
    }), Inputmask;
});