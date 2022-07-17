import { useRef, useEffect } from "react"
import { toChecksumAddress, checkAddressChecksum  } from "ethereum-checksum-address"
import { font } from './font'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'

import styles from './form.module.css'

const Form = () => {
    const input = useRef(null)
    const fills = useRef(null)
    const faxMaterial = useRef(null)

    const inputChanged = (e) => {
        if( e.data && !e.data.match('[0-9a-fA-F]') ) {
            e.target.value = e.target.value.replace(/[^0-9a-fA-F]/g, '')
            return
        }
        let value = e.target.value.replace('0x', '').substring(0, 40)
        try {
            value = toChecksumAddress(value)
            input.current.value = value;
            value = value.replace('0x', '')
            input.current.style.color = "blue";
        } catch (e) {
            input.current.style.color = "red";
            console.log(e)
        }

        if( !fills.current ) return
        for(let i = 0; i < value.length; i++) {
            const row = fills.current.children[i]
            const cols = row.children;
            for(let j = 0; j < cols.length; j++) {
                const rect = cols[j].querySelector('rect')
                if(j == parseInt(value[i],16)) {
                    rect.setAttribute('fill', '#000')
                } else {
                    rect.setAttribute('fill', 'none')
                }
            }
        }

    }

    const faxit = async () => {
        if( !faxMaterial.current || !document ) return

        const element = document.getElementById('fax-material')
        const addressBox = element.getElementById('address-input')
        
        addressBox.textContent = input.current.value

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: [612, 792]
          })

        // add the font to jsPDF
        doc.addFileToVFS("phagspa-normal.ttf", font);
        doc.addFont("phagspa-normal.ttf", "phagspa", "normal");
        doc.setFont("phagspa");


        await doc.svg(element, {
            x: 0,
            y: 0,
            width: 612,
            height: 792
        })
        await doc.save('fax-form.pdf')

        addressBox.textContent = ''

        if( !window ) return
        window.open('https://faxzero.com/', '_blank').focus()
    }
    useEffect(() => {
        if( !input.current ) return
        input.current.addEventListener('input', inputChanged)

        return () => input.current.removeEventListener('input', inputChanged)
    }, [])

    
    return (
        <>
        <svg id="fax-material" ref={faxMaterial} viewBox="0 0 612 792">
            <defs>
                <style>{`
                    text, tspan {
                        font-family: MicrosoftPhagsPa, "Microsoft PhangsPa", "Microsoft-PhangsPa", "phagspa-normal", phagspa, monospace;
                    }
                    .cls-1 {
                        fill: #fffae6;
                    }

                    .cls-2,
                    .cls-4,
                    .cls-5,
                    .cls-6,
                    .cls-7 {
                        font-size: 10.9px;
                    }

                    .cls-10,
                    .cls-2,
                    .cls-4,
                    .cls-5,
                    .cls-6,
                    .cls-7,
                    .cls-8 {
                        font-family: MicrosoftPhagsPa, "Microsoft PhagsPa";
                    }

                    .cls-2 {
                        letter-spacing: 0.05em;
                    }

                    .cls-3 {
                        letter-spacing: 0.05em;
                    }

                    .cls-4 {
                        letter-spacing: 0.06em;
                    }

                    .cls-5,
                    .cls-6 {
                        letter-spacing: -0.01em;
                    }

                    .cls-6 {
                        fill: #00f;
                    }

                    .cls-7 {
                        letter-spacing: -0.02em;
                    }

                    .cls-8 {
                        font-size: 8.79px;
                        letter-spacing: 0.03em;
                    }

                    #fills {
                        fill: none;
                    }

                    #fills rect {
                        stroke: #000;
                        stroke-miterlimit: 10;
                    }

                    #fills text {
                        font-size: 7.83px;
                        fill: #ccc;
                        letter-spacing: 0.03em;
                    }

                    input {
                        width: 100%;
                        border: none;
                        outline: none;
                        font-size: 0.665em;
                        color: blue;
                        background: transparent;
                    }
                `}
                </style>
                <symbol id="circle" viewBox="0 0 16.32 9.06">
                    <rect className="cls-9" x="0.44" y="0.44" width="15.43" height="8.17" rx="3.58" />
                </symbol>
            </defs>

            <rect id="bg" className="cls-1" width="612" height="792" />
            <g id="text-01">
                <text className="cls-2" transform="translate(35.42 44.98)">
                    <tspan x="0" y="0">Enter your ethereum address for a surprise</tspan>
                    <tspan className="cls-3">
                        <tspan x="0" y="12">
                            Status will be published at paper.walletverify.app within (5) business days.
                        </tspan>
                    </tspan>
                </text>
            </g>
            <g id="barcode-01">
                <rect x="522" y="56" width="2.43" height="10" />
                <rect x="525.65" y="56" width="1.22" height="10" />
                <rect x="529.3" y="56" width="3.65" height="10" />
                <rect x="535.39" y="56" width="2.43" height="10" />
                <rect x="540.26" y="56" width="2.43" height="10" />
                <rect x="543.91" y="56" width="2.43" height="10" />
                <rect x="548.78" y="56" width="1.22" height="10" />
                <rect x="552.43" y="56" width="1.22" height="10" />
                <rect x="556.09" y="56" width="2.43" height="10" />
                <rect x="562.17" y="56" width="2.43" height="10" />
                <rect x="568.26" y="56" width="3.65" height="10" />
                <rect x="573.13" y="56" width="1.22" height="10" />
                <rect x="575.57" y="56" width="2.43" height="10" />
            </g>
            <g id="barcode-01-2" data-name="barcode-01">
                <rect x="30" y="731" width="2.43" height="10" />
                <rect x="33.65" y="731" width="1.22" height="10" />
                <rect x="37.3" y="731" width="3.65" height="10" />
                <rect x="43.39" y="731" width="2.43" height="10" />
                <rect x="48.26" y="731" width="2.43" height="10" />
                <rect x="53.13" y="731" width="2.43" height="10" />
                <rect x="56.78" y="731" width="1.22" height="10" />
                <rect x="60.43" y="731" width="1.22" height="10" />
                <rect x="65.3" y="731" width="2.43" height="10" />
                <rect x="70.17" y="731" width="2.43" height="10" />
                <rect x="76.26" y="731" width="3.65" height="10" />
                <rect x="81.13" y="731" width="1.22" height="10" />
                <rect x="83.57" y="731" width="2.43" height="10" />
            </g>
            <g id="barcode-5-205671">
                <rect x="229.28" y="724.2" width="3.25" height="14" />
                <rect x="234.15" y="724.2" width="1.62" height="14" />
                <rect x="239.03" y="724.2" width="1.62" height="14" />
                <rect x="247.14" y="724.2" width="3.25" height="14" />
                <rect x="252.02" y="724.2" width="4.87" height="14" />
                <rect x="260.13" y="724.2" width="1.62" height="14" />
                <rect x="265.01" y="724.2" width="1.62" height="14" />
                <rect x="269.88" y="724.2" width="3.25" height="14" />
                <rect x="274.75" y="724.2" width="4.87" height="14" />
                <rect x="282.87" y="724.2" width="1.62" height="14" />
                <rect x="286.11" y="724.2" width="4.87" height="14" />
                <rect x="292.61" y="724.2" width="6.5" height="14" />
                <rect x="300.73" y="724.2" width="3.25" height="14" />
                <rect x="307.22" y="724.2" width="1.62" height="14" />
                <rect x="312.09" y="724.2" width="4.87" height="14" />
                <rect x="318.59" y="724.2" width="4.87" height="14" />
                <rect x="328.33" y="724.2" width="1.62" height="14" />
                <rect x="331.58" y="724.2" width="3.25" height="14" />
                <rect x="336.45" y="724.2" width="1.62" height="14" />
                <rect x="341.32" y="724.2" width="3.25" height="14" />
                <rect x="346.19" y="724.2" width="1.62" height="14" />
                <rect x="354.31" y="724.2" width="4.87" height="14" />
                <rect x="360.81" y="724.2" width="1.62" height="14" />
                <rect x="364.06" y="724.2" width="6.5" height="14" />
                <rect x="372.17" y="724.2" width="3.25" height="14" />
                <rect x="380.29" y="724.2" width="4.87" height="14" />
                <rect x="386.79" y="724.2" width="1.62" height="14" />
                <rect x="390.04" y="724.2" width="3.25" height="14" />
            </g>
            <text id="fax" className="cls-4" transform="translate(276.92 44.98)"><tspan x="0" y="0">Fax to +1 (929) 446-3491</tspan></text>
            <g id="slashes">
                <polygon points="267.12 45.79 266.06 45.79 268.8 37.74 269.75 37.74 267.12 45.79" />
                <polygon points="270.42 45.79 269.37 45.79 272.11 37.74 273.05 37.74 270.42 45.79" />
            </g>
                <text id="eth-address" className="cls-5" transform="translate(38.66 73.38)">
                <tspan x="0" y="0">ETH Address for Allowlist :</tspan>
                </text>
                <text className="cls-6" transform="translate(165.68 73.38)">
                    <tspan id="address-input" x="0" y="0"></tspan>
                </text>
                <foreignObject transform="translate(162 57)" width="320" height="25">
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <input ref={input} type="text" placeholder="Type your address here ..." pattern="(0x)?[a-fA-F0-9]{40}" maxLength={42}></input>
                    </div>
                </foreignObject>

                <text className="cls-7" transform="translate(42.23 88.28)"><tspan x="0" y="0">0x</tspan></text>
                <text className="cls-8" transform="translate(290.1 745.74) scale(1.07 1)"><tspan x="0" y="0">5-205671</tspan></text>
            <line id="address-line" className="cls-9" x1="163" y1="75" x2="420" y2="75" />
            <g id="fills" ref={fills}>
                <g>
                    <g>
                        <text transform="translate(97.27 86.21)">0</text><rect x="91.78" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 86.21)">1</text><rect x="122.22" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 86.21)">2</text><rect x="152.66" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 86.21)">3</text><rect x="183.1" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 86.21)">4</text><rect x="213.54" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 86.21)">5</text><rect x="243.98" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 86.21)">6</text><rect x="274.42" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 86.21)">7</text><rect x="304.86" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 86.21)">8</text><rect x="335.3" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 86.21)">9</text><rect x="365.74" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 86.21)">A</text><rect x="396.17" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 86.21)">B</text><rect x="426.61" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 86.21)">C</text><rect x="457.05" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 86.21)">D</text><rect x="487.49" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 86.21)">E</text><rect x="517.93" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 86.21)">F</text><rect x="548.37" y="79.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 102.41)">0</text><rect x="91.78" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 102.41)">1</text><rect x="122.22" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 102.41)">2</text><rect x="152.66" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 102.41)">3</text><rect x="183.1" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 102.41)">4</text><rect x="213.54" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 102.41)">5</text><rect x="243.98" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 102.41)">6</text><rect x="274.42" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 102.41)">7</text><rect x="304.86" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 102.41)">8</text><rect x="335.3" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 102.41)">9</text><rect x="365.74" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 102.41)">A</text><rect x="396.17" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 102.41)">B</text><rect x="426.61" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 102.41)">C</text><rect x="457.05" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 102.41)">D</text><rect x="487.49" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 102.41)">E</text><rect x="517.93" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 102.41)">F</text><rect x="548.37" y="95.62" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 118.62)">0</text><rect x="91.78" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 118.62)">1</text><rect x="122.22" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 118.62)">2</text><rect x="152.66" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 118.62)">3</text><rect x="183.1" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 118.62)">4</text><rect x="213.54" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 118.62)">5</text><rect x="243.98" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 118.62)">6</text><rect x="274.42" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 118.62)">7</text><rect x="304.86" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 118.62)">8</text><rect x="335.3" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 118.62)">9</text><rect x="365.74" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 118.62)">A</text><rect x="396.17" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 118.62)">B</text><rect x="426.61" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 118.62)">C</text><rect x="457.05" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 118.62)">D</text><rect x="487.49" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 118.62)">E</text><rect x="517.93" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 118.62)">F</text><rect x="548.37" y="111.83" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 134.83)">0</text><rect x="91.78" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 134.83)">1</text><rect x="122.22" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 134.83)">2</text><rect x="152.66" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 134.83)">3</text><rect x="183.1" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 134.83)">4</text><rect x="213.54" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 134.83)">5</text><rect x="243.98" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 134.83)">6</text><rect x="274.42" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 134.83)">7</text><rect x="304.86" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 134.83)">8</text><rect x="335.3" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 134.83)">9</text><rect x="365.74" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 134.83)">A</text><rect x="396.17" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 134.83)">B</text><rect x="426.61" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 134.83)">C</text><rect x="457.05" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 134.83)">D</text><rect x="487.49" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 134.83)">E</text><rect x="517.93" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 134.83)">F</text><rect x="548.37" y="128.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 151.03)">0</text><rect x="91.78" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 151.03)">1</text><rect x="122.22" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 151.03)">2</text><rect x="152.66" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 151.03)">3</text><rect x="183.1" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 151.03)">4</text><rect x="213.54" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 151.03)">5</text><rect x="243.98" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 151.03)">6</text><rect x="274.42" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 151.03)">7</text><rect x="304.86" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 151.03)">8</text><rect x="335.3" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 151.03)">9</text><rect x="365.74" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 151.03)">A</text><rect x="396.17" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 151.03)">B</text><rect x="426.61" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 151.03)">C</text><rect x="457.05" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 151.03)">D</text><rect x="487.49" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 151.03)">E</text><rect x="517.93" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 151.03)">F</text><rect x="548.37" y="144.24" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 167.24)">0</text><rect x="91.78" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 167.24)">1</text><rect x="122.22" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 167.24)">2</text><rect x="152.66" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 167.24)">3</text><rect x="183.1" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 167.24)">4</text><rect x="213.54" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 167.24)">5</text><rect x="243.98" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 167.24)">6</text><rect x="274.42" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 167.24)">7</text><rect x="304.86" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 167.24)">8</text><rect x="335.3" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 167.24)">9</text><rect x="365.74" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 167.24)">A</text><rect x="396.17" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 167.24)">B</text><rect x="426.61" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 167.24)">C</text><rect x="457.05" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 167.24)">D</text><rect x="487.49" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 167.24)">E</text><rect x="517.93" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 167.24)">F</text><rect x="548.37" y="160.45" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 183.45)">0</text><rect x="91.78" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 183.45)">1</text><rect x="122.22" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 183.45)">2</text><rect x="152.66" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 183.45)">3</text><rect x="183.1" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 183.45)">4</text><rect x="213.54" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 183.45)">5</text><rect x="243.98" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 183.45)">6</text><rect x="274.42" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 183.45)">7</text><rect x="304.86" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 183.45)">8</text><rect x="335.3" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 183.45)">9</text><rect x="365.74" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 183.45)">A</text><rect x="396.17" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 183.45)">B</text><rect x="426.61" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 183.45)">C</text><rect x="457.05" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 183.45)">D</text><rect x="487.49" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 183.45)">E</text><rect x="517.93" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 183.45)">F</text><rect x="548.37" y="176.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 199.65)">0</text><rect x="91.78" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 199.65)">1</text><rect x="122.22" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 199.65)">2</text><rect x="152.66" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 199.65)">3</text><rect x="183.1" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 199.65)">4</text><rect x="213.54" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 199.65)">5</text><rect x="243.98" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 199.65)">6</text><rect x="274.42" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 199.65)">7</text><rect x="304.86" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 199.65)">8</text><rect x="335.3" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 199.65)">9</text><rect x="365.74" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 199.65)">A</text><rect x="396.17" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 199.65)">B</text><rect x="426.61" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 199.65)">C</text><rect x="457.05" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 199.65)">D</text><rect x="487.49" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 199.65)">E</text><rect x="517.93" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 199.65)">F</text><rect x="548.37" y="192.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 215.86)">0</text><rect x="91.78" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 215.86)">1</text><rect x="122.22" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 215.86)">2</text><rect x="152.66" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 215.86)">3</text><rect x="183.1" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 215.86)">4</text><rect x="213.54" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 215.86)">5</text><rect x="243.98" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 215.86)">6</text><rect x="274.42" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 215.86)">7</text><rect x="304.86" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 215.86)">8</text><rect x="335.3" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 215.86)">9</text><rect x="365.74" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 215.86)">A</text><rect x="396.17" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 215.86)">B</text><rect x="426.61" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 215.86)">C</text><rect x="457.05" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 215.86)">D</text><rect x="487.49" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 215.86)">E</text><rect x="517.93" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 215.86)">F</text><rect x="548.37" y="209.07" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 232.07)">0</text><rect x="91.78" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 232.07)">1</text><rect x="122.22" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 232.07)">2</text><rect x="152.66" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 232.07)">3</text><rect x="183.1" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 232.07)">4</text><rect x="213.54" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 232.07)">5</text><rect x="243.98" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 232.07)">6</text><rect x="274.42" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 232.07)">7</text><rect x="304.86" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 232.07)">8</text><rect x="335.3" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 232.07)">9</text><rect x="365.74" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 232.07)">A</text><rect x="396.17" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 232.07)">B</text><rect x="426.61" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 232.07)">C</text><rect x="457.05" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 232.07)">D</text><rect x="487.49" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 232.07)">E</text><rect x="517.93" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 232.07)">F</text><rect x="548.37" y="225.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 248.27)">0</text><rect x="91.78" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 248.27)">1</text><rect x="122.22" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 248.27)">2</text><rect x="152.66" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 248.27)">3</text><rect x="183.1" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 248.27)">4</text><rect x="213.54" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 248.27)">5</text><rect x="243.98" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 248.27)">6</text><rect x="274.42" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 248.27)">7</text><rect x="304.86" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 248.27)">8</text><rect x="335.3" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 248.27)">9</text><rect x="365.74" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 248.27)">A</text><rect x="396.17" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 248.27)">B</text><rect x="426.61" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 248.27)">C</text><rect x="457.05" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 248.27)">D</text><rect x="487.49" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 248.27)">E</text><rect x="517.93" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 248.27)">F</text><rect x="548.37" y="241.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 264.48)">0</text><rect x="91.78" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 264.48)">1</text><rect x="122.22" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 264.48)">2</text><rect x="152.66" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 264.48)">3</text><rect x="183.1" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 264.48)">4</text><rect x="213.54" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 264.48)">5</text><rect x="243.98" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 264.48)">6</text><rect x="274.42" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 264.48)">7</text><rect x="304.86" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 264.48)">8</text><rect x="335.3" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 264.48)">9</text><rect x="365.74" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 264.48)">A</text><rect x="396.17" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 264.48)">B</text><rect x="426.61" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 264.48)">C</text><rect x="457.05" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 264.48)">D</text><rect x="487.49" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 264.48)">E</text><rect x="517.93" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 264.48)">F</text><rect x="548.37" y="257.69" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 280.69)">0</text><rect x="91.78" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 280.69)">1</text><rect x="122.22" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 280.69)">2</text><rect x="152.66" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 280.69)">3</text><rect x="183.1" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 280.69)">4</text><rect x="213.54" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 280.69)">5</text><rect x="243.98" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 280.69)">6</text><rect x="274.42" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 280.69)">7</text><rect x="304.86" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 280.69)">8</text><rect x="335.3" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 280.69)">9</text><rect x="365.74" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 280.69)">A</text><rect x="396.17" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 280.69)">B</text><rect x="426.61" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 280.69)">C</text><rect x="457.05" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 280.69)">D</text><rect x="487.49" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 280.69)">E</text><rect x="517.93" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 280.69)">F</text><rect x="548.37" y="273.89" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 296.89)">0</text><rect x="91.78" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 296.89)">1</text><rect x="122.22" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 296.89)">2</text><rect x="152.66" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 296.89)">3</text><rect x="183.1" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 296.89)">4</text><rect x="213.54" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 296.89)">5</text><rect x="243.98" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 296.89)">6</text><rect x="274.42" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 296.89)">7</text><rect x="304.86" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 296.89)">8</text><rect x="335.3" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 296.89)">9</text><rect x="365.74" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 296.89)">A</text><rect x="396.17" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 296.89)">B</text><rect x="426.61" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 296.89)">C</text><rect x="457.05" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 296.89)">D</text><rect x="487.49" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 296.89)">E</text><rect x="517.93" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 296.89)">F</text><rect x="548.37" y="290.1" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 313.1)">0</text><rect x="91.78" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 313.1)">1</text><rect x="122.22" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 313.1)">2</text><rect x="152.66" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 313.1)">3</text><rect x="183.1" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 313.1)">4</text><rect x="213.54" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 313.1)">5</text><rect x="243.98" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 313.1)">6</text><rect x="274.42" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 313.1)">7</text><rect x="304.86" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 313.1)">8</text><rect x="335.3" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 313.1)">9</text><rect x="365.74" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 313.1)">A</text><rect x="396.17" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 313.1)">B</text><rect x="426.61" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 313.1)">C</text><rect x="457.05" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 313.1)">D</text><rect x="487.49" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 313.1)">E</text><rect x="517.93" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 313.1)">F</text><rect x="548.37" y="306.31" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 329.31)">0</text><rect x="91.78" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 329.31)">1</text><rect x="122.22" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 329.31)">2</text><rect x="152.66" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 329.31)">3</text><rect x="183.1" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 329.31)">4</text><rect x="213.54" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 329.31)">5</text><rect x="243.98" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 329.31)">6</text><rect x="274.42" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 329.31)">7</text><rect x="304.86" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 329.31)">8</text><rect x="335.3" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 329.31)">9</text><rect x="365.74" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 329.31)">A</text><rect x="396.17" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 329.31)">B</text><rect x="426.61" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 329.31)">C</text><rect x="457.05" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 329.31)">D</text><rect x="487.49" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 329.31)">E</text><rect x="517.93" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 329.31)">F</text><rect x="548.37" y="322.51" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 345.51)">0</text><rect x="91.78" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 345.51)">1</text><rect x="122.22" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 345.51)">2</text><rect x="152.66" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 345.51)">3</text><rect x="183.1" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 345.51)">4</text><rect x="213.54" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 345.51)">5</text><rect x="243.98" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 345.51)">6</text><rect x="274.42" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 345.51)">7</text><rect x="304.86" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 345.51)">8</text><rect x="335.3" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 345.51)">9</text><rect x="365.74" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 345.51)">A</text><rect x="396.17" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 345.51)">B</text><rect x="426.61" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 345.51)">C</text><rect x="457.05" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 345.51)">D</text><rect x="487.49" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 345.51)">E</text><rect x="517.93" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 345.51)">F</text><rect x="548.37" y="338.72" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 361.72)">0</text><rect x="91.78" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 361.72)">1</text><rect x="122.22" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 361.72)">2</text><rect x="152.66" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 361.72)">3</text><rect x="183.1" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 361.72)">4</text><rect x="213.54" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 361.72)">5</text><rect x="243.98" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 361.72)">6</text><rect x="274.42" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 361.72)">7</text><rect x="304.86" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 361.72)">8</text><rect x="335.3" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 361.72)">9</text><rect x="365.74" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 361.72)">A</text><rect x="396.17" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 361.72)">B</text><rect x="426.61" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 361.72)">C</text><rect x="457.05" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 361.72)">D</text><rect x="487.49" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 361.72)">E</text><rect x="517.93" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 361.72)">F</text><rect x="548.37" y="354.93" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 377.93)">0</text><rect x="91.78" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 377.93)">1</text><rect x="122.22" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 377.93)">2</text><rect x="152.66" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 377.93)">3</text><rect x="183.1" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 377.93)">4</text><rect x="213.54" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 377.93)">5</text><rect x="243.98" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 377.93)">6</text><rect x="274.42" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 377.93)">7</text><rect x="304.86" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 377.93)">8</text><rect x="335.3" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 377.93)">9</text><rect x="365.74" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 377.93)">A</text><rect x="396.17" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 377.93)">B</text><rect x="426.61" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 377.93)">C</text><rect x="457.05" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 377.93)">D</text><rect x="487.49" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 377.93)">E</text><rect x="517.93" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 377.93)">F</text><rect x="548.37" y="371.13" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 394.13)">0</text><rect x="91.78" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 394.13)">1</text><rect x="122.22" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 394.13)">2</text><rect x="152.66" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 394.13)">3</text><rect x="183.1" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 394.13)">4</text><rect x="213.54" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 394.13)">5</text><rect x="243.98" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 394.13)">6</text><rect x="274.42" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 394.13)">7</text><rect x="304.86" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 394.13)">8</text><rect x="335.3" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 394.13)">9</text><rect x="365.74" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 394.13)">A</text><rect x="396.17" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 394.13)">B</text><rect x="426.61" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 394.13)">C</text><rect x="457.05" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 394.13)">D</text><rect x="487.49" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 394.13)">E</text><rect x="517.93" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 394.13)">F</text><rect x="548.37" y="387.34" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 410.34)">0</text><rect x="91.78" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 410.34)">1</text><rect x="122.22" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 410.34)">2</text><rect x="152.66" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 410.34)">3</text><rect x="183.1" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 410.34)">4</text><rect x="213.54" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 410.34)">5</text><rect x="243.98" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 410.34)">6</text><rect x="274.42" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 410.34)">7</text><rect x="304.86" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 410.34)">8</text><rect x="335.3" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 410.34)">9</text><rect x="365.74" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 410.34)">A</text><rect x="396.17" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 410.34)">B</text><rect x="426.61" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 410.34)">C</text><rect x="457.05" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 410.34)">D</text><rect x="487.49" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 410.34)">E</text><rect x="517.93" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 410.34)">F</text><rect x="548.37" y="403.55" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 426.55)">0</text><rect x="91.78" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 426.55)">1</text><rect x="122.22" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 426.55)">2</text><rect x="152.66" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 426.55)">3</text><rect x="183.1" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 426.55)">4</text><rect x="213.54" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 426.55)">5</text><rect x="243.98" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 426.55)">6</text><rect x="274.42" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 426.55)">7</text><rect x="304.86" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 426.55)">8</text><rect x="335.3" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 426.55)">9</text><rect x="365.74" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 426.55)">A</text><rect x="396.17" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 426.55)">B</text><rect x="426.61" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 426.55)">C</text><rect x="457.05" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 426.55)">D</text><rect x="487.49" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 426.55)">E</text><rect x="517.93" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 426.55)">F</text><rect x="548.37" y="419.75" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 442.75)">0</text><rect x="91.78" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 442.75)">1</text><rect x="122.22" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 442.75)">2</text><rect x="152.66" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 442.75)">3</text><rect x="183.1" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 442.75)">4</text><rect x="213.54" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 442.75)">5</text><rect x="243.98" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 442.75)">6</text><rect x="274.42" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 442.75)">7</text><rect x="304.86" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 442.75)">8</text><rect x="335.3" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 442.75)">9</text><rect x="365.74" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 442.75)">A</text><rect x="396.17" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 442.75)">B</text><rect x="426.61" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 442.75)">C</text><rect x="457.05" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 442.75)">D</text><rect x="487.49" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 442.75)">E</text><rect x="517.93" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 442.75)">F</text><rect x="548.37" y="435.96" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 458.96)">0</text><rect x="91.78" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 458.96)">1</text><rect x="122.22" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 458.96)">2</text><rect x="152.66" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 458.96)">3</text><rect x="183.1" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 458.96)">4</text><rect x="213.54" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 458.96)">5</text><rect x="243.98" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 458.96)">6</text><rect x="274.42" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 458.96)">7</text><rect x="304.86" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 458.96)">8</text><rect x="335.3" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 458.96)">9</text><rect x="365.74" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 458.96)">A</text><rect x="396.17" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 458.96)">B</text><rect x="426.61" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 458.96)">C</text><rect x="457.05" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 458.96)">D</text><rect x="487.49" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 458.96)">E</text><rect x="517.93" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 458.96)">F</text><rect x="548.37" y="452.17" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 475.17)">0</text><rect x="91.78" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 475.17)">1</text><rect x="122.22" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 475.17)">2</text><rect x="152.66" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 475.17)">3</text><rect x="183.1" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 475.17)">4</text><rect x="213.54" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 475.17)">5</text><rect x="243.98" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 475.17)">6</text><rect x="274.42" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 475.17)">7</text><rect x="304.86" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 475.17)">8</text><rect x="335.3" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 475.17)">9</text><rect x="365.74" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 475.17)">A</text><rect x="396.17" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 475.17)">B</text><rect x="426.61" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 475.17)">C</text><rect x="457.05" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 475.17)">D</text><rect x="487.49" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 475.17)">E</text><rect x="517.93" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 475.17)">F</text><rect x="548.37" y="468.37" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 491.37)">0</text><rect x="91.78" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 491.37)">1</text><rect x="122.22" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 491.37)">2</text><rect x="152.66" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 491.37)">3</text><rect x="183.1" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 491.37)">4</text><rect x="213.54" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 491.37)">5</text><rect x="243.98" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 491.37)">6</text><rect x="274.42" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 491.37)">7</text><rect x="304.86" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 491.37)">8</text><rect x="335.3" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 491.37)">9</text><rect x="365.74" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 491.37)">A</text><rect x="396.17" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 491.37)">B</text><rect x="426.61" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 491.37)">C</text><rect x="457.05" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 491.37)">D</text><rect x="487.49" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 491.37)">E</text><rect x="517.93" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 491.37)">F</text><rect x="548.37" y="484.58" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 507.58)">0</text><rect x="91.78" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 507.58)">1</text><rect x="122.22" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 507.58)">2</text><rect x="152.66" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 507.58)">3</text><rect x="183.1" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 507.58)">4</text><rect x="213.54" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 507.58)">5</text><rect x="243.98" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 507.58)">6</text><rect x="274.42" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 507.58)">7</text><rect x="304.86" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 507.58)">8</text><rect x="335.3" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 507.58)">9</text><rect x="365.74" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 507.58)">A</text><rect x="396.17" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 507.58)">B</text><rect x="426.61" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 507.58)">C</text><rect x="457.05" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 507.58)">D</text><rect x="487.49" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 507.58)">E</text><rect x="517.93" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 507.58)">F</text><rect x="548.37" y="500.79" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 523.79)">0</text><rect x="91.78" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 523.79)">1</text><rect x="122.22" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 523.79)">2</text><rect x="152.66" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 523.79)">3</text><rect x="183.1" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 523.79)">4</text><rect x="213.54" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 523.79)">5</text><rect x="243.98" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 523.79)">6</text><rect x="274.42" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 523.79)">7</text><rect x="304.86" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 523.79)">8</text><rect x="335.3" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 523.79)">9</text><rect x="365.74" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 523.79)">A</text><rect x="396.17" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 523.79)">B</text><rect x="426.61" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 523.79)">C</text><rect x="457.05" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 523.79)">D</text><rect x="487.49" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 523.79)">E</text><rect x="517.93" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 523.79)">F</text><rect x="548.37" y="516.99" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 539.99)">0</text><rect x="91.78" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 539.99)">1</text><rect x="122.22" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 539.99)">2</text><rect x="152.66" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 539.99)">3</text><rect x="183.1" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 539.99)">4</text><rect x="213.54" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 539.99)">5</text><rect x="243.98" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 539.99)">6</text><rect x="274.42" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 539.99)">7</text><rect x="304.86" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 539.99)">8</text><rect x="335.3" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 539.99)">9</text><rect x="365.74" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 539.99)">A</text><rect x="396.17" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 539.99)">B</text><rect x="426.61" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 539.99)">C</text><rect x="457.05" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 539.99)">D</text><rect x="487.49" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 539.99)">E</text><rect x="517.93" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 539.99)">F</text><rect x="548.37" y="533.2" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 556.2)">0</text><rect x="91.78" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 556.2)">1</text><rect x="122.22" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 556.2)">2</text><rect x="152.66" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 556.2)">3</text><rect x="183.1" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 556.2)">4</text><rect x="213.54" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 556.2)">5</text><rect x="243.98" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 556.2)">6</text><rect x="274.42" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 556.2)">7</text><rect x="304.86" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 556.2)">8</text><rect x="335.3" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 556.2)">9</text><rect x="365.74" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 556.2)">A</text><rect x="396.17" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 556.2)">B</text><rect x="426.61" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 556.2)">C</text><rect x="457.05" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 556.2)">D</text><rect x="487.49" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 556.2)">E</text><rect x="517.93" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 556.2)">F</text><rect x="548.37" y="549.41" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 572.41)">0</text><rect x="91.78" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 572.41)">1</text><rect x="122.22" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 572.41)">2</text><rect x="152.66" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 572.41)">3</text><rect x="183.1" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 572.41)">4</text><rect x="213.54" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 572.41)">5</text><rect x="243.98" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 572.41)">6</text><rect x="274.42" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 572.41)">7</text><rect x="304.86" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 572.41)">8</text><rect x="335.3" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 572.41)">9</text><rect x="365.74" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 572.41)">A</text><rect x="396.17" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 572.41)">B</text><rect x="426.61" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 572.41)">C</text><rect x="457.05" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 572.41)">D</text><rect x="487.49" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 572.41)">E</text><rect x="517.93" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 572.41)">F</text><rect x="548.37" y="565.61" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 588.61)">0</text><rect x="91.78" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 588.61)">1</text><rect x="122.22" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 588.61)">2</text><rect x="152.66" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 588.61)">3</text><rect x="183.1" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 588.61)">4</text><rect x="213.54" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 588.61)">5</text><rect x="243.98" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 588.61)">6</text><rect x="274.42" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 588.61)">7</text><rect x="304.86" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 588.61)">8</text><rect x="335.3" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 588.61)">9</text><rect x="365.74" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 588.61)">A</text><rect x="396.17" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 588.61)">B</text><rect x="426.61" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 588.61)">C</text><rect x="457.05" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 588.61)">D</text><rect x="487.49" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 588.61)">E</text><rect x="517.93" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 588.61)">F</text><rect x="548.37" y="581.82" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 604.82)">0</text><rect x="91.78" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 604.82)">1</text><rect x="122.22" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 604.82)">2</text><rect x="152.66" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 604.82)">3</text><rect x="183.1" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 604.82)">4</text><rect x="213.54" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 604.82)">5</text><rect x="243.98" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 604.82)">6</text><rect x="274.42" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 604.82)">7</text><rect x="304.86" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 604.82)">8</text><rect x="335.3" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 604.82)">9</text><rect x="365.74" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 604.82)">A</text><rect x="396.17" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 604.82)">B</text><rect x="426.61" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 604.82)">C</text><rect x="457.05" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 604.82)">D</text><rect x="487.49" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 604.82)">E</text><rect x="517.93" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 604.82)">F</text><rect x="548.37" y="598.03" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 621.03)">0</text><rect x="91.78" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 621.03)">1</text><rect x="122.22" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 621.03)">2</text><rect x="152.66" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 621.03)">3</text><rect x="183.1" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 621.03)">4</text><rect x="213.54" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 621.03)">5</text><rect x="243.98" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 621.03)">6</text><rect x="274.42" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 621.03)">7</text><rect x="304.86" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 621.03)">8</text><rect x="335.3" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 621.03)">9</text><rect x="365.74" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 621.03)">A</text><rect x="396.17" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 621.03)">B</text><rect x="426.61" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 621.03)">C</text><rect x="457.05" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 621.03)">D</text><rect x="487.49" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 621.03)">E</text><rect x="517.93" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 621.03)">F</text><rect x="548.37" y="614.23" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 637.23)">0</text><rect x="91.78" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 637.23)">1</text><rect x="122.22" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 637.23)">2</text><rect x="152.66" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 637.23)">3</text><rect x="183.1" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 637.23)">4</text><rect x="213.54" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 637.23)">5</text><rect x="243.98" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 637.23)">6</text><rect x="274.42" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 637.23)">7</text><rect x="304.86" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 637.23)">8</text><rect x="335.3" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 637.23)">9</text><rect x="365.74" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 637.23)">A</text><rect x="396.17" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 637.23)">B</text><rect x="426.61" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 637.23)">C</text><rect x="457.05" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 637.23)">D</text><rect x="487.49" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 637.23)">E</text><rect x="517.93" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 637.23)">F</text><rect x="548.37" y="630.44" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 653.44)">0</text><rect x="91.78" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 653.44)">1</text><rect x="122.22" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 653.44)">2</text><rect x="152.66" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 653.44)">3</text><rect x="183.1" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 653.44)">4</text><rect x="213.54" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 653.44)">5</text><rect x="243.98" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 653.44)">6</text><rect x="274.42" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 653.44)">7</text><rect x="304.86" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 653.44)">8</text><rect x="335.3" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 653.44)">9</text><rect x="365.74" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 653.44)">A</text><rect x="396.17" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 653.44)">B</text><rect x="426.61" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 653.44)">C</text><rect x="457.05" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 653.44)">D</text><rect x="487.49" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 653.44)">E</text><rect x="517.93" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 653.44)">F</text><rect x="548.37" y="646.65" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 669.65)">0</text><rect x="91.78" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 669.65)">1</text><rect x="122.22" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 669.65)">2</text><rect x="152.66" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 669.65)">3</text><rect x="183.1" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 669.65)">4</text><rect x="213.54" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 669.65)">5</text><rect x="243.98" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 669.65)">6</text><rect x="274.42" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 669.65)">7</text><rect x="304.86" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 669.65)">8</text><rect x="335.3" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 669.65)">9</text><rect x="365.74" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 669.65)">A</text><rect x="396.17" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 669.65)">B</text><rect x="426.61" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 669.65)">C</text><rect x="457.05" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 669.65)">D</text><rect x="487.49" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 669.65)">E</text><rect x="517.93" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 669.65)">F</text><rect x="548.37" y="662.86" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 685.85)">0</text><rect x="91.78" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 685.85)">1</text><rect x="122.22" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 685.85)">2</text><rect x="152.66" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 685.85)">3</text><rect x="183.1" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 685.85)">4</text><rect x="213.54" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 685.85)">5</text><rect x="243.98" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 685.85)">6</text><rect x="274.42" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 685.85)">7</text><rect x="304.86" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 685.85)">8</text><rect x="335.3" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 685.85)">9</text><rect x="365.74" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 685.85)">A</text><rect x="396.17" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 685.85)">B</text><rect x="426.61" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 685.85)">C</text><rect x="457.05" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 685.85)">D</text><rect x="487.49" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 685.85)">E</text><rect x="517.93" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 685.85)">F</text><rect x="548.37" y="679.06" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 702.06)">0</text><rect x="91.78" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 702.06)">1</text><rect x="122.22" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 702.06)">2</text><rect x="152.66" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 702.06)">3</text><rect x="183.1" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 702.06)">4</text><rect x="213.54" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 702.06)">5</text><rect x="243.98" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 702.06)">6</text><rect x="274.42" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 702.06)">7</text><rect x="304.86" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 702.06)">8</text><rect x="335.3" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 702.06)">9</text><rect x="365.74" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 702.06)">A</text><rect x="396.17" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 702.06)">B</text><rect x="426.61" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 702.06)">C</text><rect x="457.05" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 702.06)">D</text><rect x="487.49" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 702.06)">E</text><rect x="517.93" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 702.06)">F</text><rect x="548.37" y="695.27" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
                <g>
                    <g>
                        <text transform="translate(97.27 718.27)">0</text><rect x="91.78" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(127.71 718.27)">1</text><rect x="122.22" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(158.15 718.27)">2</text><rect x="152.66" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(188.59 718.27)">3</text><rect x="183.1" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(219.03 718.27)">4</text><rect x="213.54" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(249.46 718.27)">5</text><rect x="243.98" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(279.9 718.27)">6</text><rect x="274.42" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(310.34 718.27)">7</text><rect x="304.86" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(340.78 718.27)">8</text><rect x="335.3" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(371.22 718.27)">9</text><rect x="365.74" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(401.25 718.27)">A</text><rect x="396.17" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(431.97 718.27)">B</text><rect x="426.61" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(462.22 718.27)">C</text><rect x="457.05" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(492.34 718.27)">D</text><rect x="487.49" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(523.55 718.27)">E</text><rect x="517.93" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                    <g>
                        <text transform="translate(554.05 718.27)">F</text><rect x="548.37" y="711.48" width="15.43" height="8.17" rx="3.58" />
                    </g>
                </g>
            </g>
        </svg>
        <p>Click on the FAX button to download your PDF form. It will also open a new tab to send the fax for free.</p>
        <div className={styles.fax} onClick={faxit}>FAX</div>
        </>
    )
}

export default Form