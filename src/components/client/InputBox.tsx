export default function InputBox() {
      return (
         <label className="grid">
               Copy paste your file URLs here.
               <textarea className="border" id="fileCheckerTextArea" cols={2} rows={10} />
         </label>
      )
}