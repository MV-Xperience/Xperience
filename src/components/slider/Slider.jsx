import { useRef, useEffect, useState, forwardRef } from "react";

const Slider = forwardRef((props, ref) => {

    const [value, setValue] = useState(3);
    const selectedVal = useRef();
  
    const updateLook = (newValue)=>{
        const percThrough = ((newValue - props.min) / props.max); // 12.5 bc circle thingy has width of 25px
        let thumbPos = ((newValue - props.min) / props.max) * ref.current.clientWidth; // 12.5 bc circle thingy has width of 25px
        // event.target.style.boxShadow += " 5px 5px 5px black";
		if (selectedVal.current)
		{
			if (newValue === '0')
			{
				console.log('here')
				selectedVal.current.style.color = 'var(--shadow-color)'
				thumbPos += 10
			}
			else {
				if (percThrough*ref.current.clientWidth-10<selectedVal.current.scrollWidth) // if text is outside of bar
				{
					selectedVal.current.style.color = 'var(--content-color)'
					thumbPos += 10;
				}
				else
				{
					selectedVal.current.style.color = 'black'
					thumbPos += -selectedVal.current.scrollWidth - 5
				}
			}
		}
        ref.current.style.backgroundSize = `${percThrough*100}% 100%`;
        if (selectedVal.current) selectedVal.current.style.left = thumbPos+'px';
    } 
    
    useEffect(()=>{
        setTimeout(() => {
            setValue(props.defaultValue);
            updateLook(props.defaultValue);
        }, 100);
    }, [props,updateLook]);

    const onSliderChange = (e)=>{
        const newValue = e.target.value;
        setValue(newValue);
        updateLook(newValue);
    }

    
	
    return (
        <div className='slider'>
            <input
                onChange={(event) => onSliderChange(event)}
                type='range'
                ref={ref}
                min={props.min}
                max={props.max}
                step={props.step}
                defaultValue={props.defaultValue}
                style={props.style}></input>
            <p ref={selectedVal}>{value}</p>
        </div>
    );
});
export default Slider;