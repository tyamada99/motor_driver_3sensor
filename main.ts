function 左回転 () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, (スピード + バランス) / 2)
    pins.analogWritePin(AnalogPin.P15, スピード / 2)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function 右距離を測る () {
    右距離 = 0
    while (右距離 == 0) {
        右距離 = sonar.ping(
        DigitalPin.P4,
        DigitalPin.P6,
        PingUnit.Centimeters
        )
    }
    serial.writeValue("migi", 右距離)
    return 右距離
}
input.onButtonPressed(Button.A, function () {
    電源 = 1
})
function バック () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, スピード + バランス)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, スピード)
}
function 左距離を測る () {
    左距離 = 0
    while (左距離 == 0) {
        左距離 = sonar.ping(
        DigitalPin.P7,
        DigitalPin.P8,
        PingUnit.Centimeters
        )
    }
    serial.writeValue("hidari", 左距離)
    return 左距離
}
function 前進 () {
    pins.analogWritePin(AnalogPin.P12, スピード + バランス)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, スピード + 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function 右回転 () {
    pins.analogWritePin(AnalogPin.P12, (スピード + バランス) / 2)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, スピード / 2)
}
input.onButtonPressed(Button.B, function () {
    電源 = 0
})
function 停止 () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function 正面距離を測る () {
    正面距離 = 0
    while (正面距離 == 0) {
        正面距離 = sonar.ping(
        DigitalPin.P0,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
    }
    serial.writeValue("syomen", 正面距離)
    return 正面距離
}
let 正面距離 = 0
let 左距離 = 0
let 右距離 = 0
let バランス = 0
let スピード = 0
let 電源 = 0
led.enable(false)
停止()
電源 = 0
スピード = 500
バランス = 50
let 最大距離 = 25
let 最小距離 = 15
serial.redirectToUSB()
basic.forever(function () {
    while (電源 == 1) {
        正面距離を測る()
        basic.pause(200)
        右距離を測る()
        basic.pause(200)
        左距離を測る()
        if (正面距離 > 右距離) {
            右回転()
        } else if (正面距離 > 左距離) {
            左回転()
        } else if (正面距離 > 最大距離) {
            前進()
        } else if (正面距離 < 最小距離) {
            バック()
        } else {
            停止()
        }
        basic.pause(200)
    }
    停止()
    basic.pause(200)
})
