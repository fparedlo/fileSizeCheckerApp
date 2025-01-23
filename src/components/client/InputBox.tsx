export default function InputBox() {
      return (
         <label className="grid">
               Copy paste your file URLs here.
               <textarea 
                  className="border p-3" 
                  id="fileCheckerTextArea"
                  name="fileCheckerTextArea"
                  cols={2}
                  rows={10} />
         </label>
      )
}