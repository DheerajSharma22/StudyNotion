import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Table */}
          <Table>
            <Thead>
              <Tr className="grid grid-cols-8 rounded-t-lg bg-richblack-500 py-3 place-items-start px-5">
                <Th className="col-span-5">Course Name</Th>
                <Th>Duration</Th>
                <Th className="col-span-2">Progress</Th>
              </Tr>
            </Thead>
            <Tbody>
              {enrolledCourses.map((course, i, arr) => (
                <Tr
                  className={`grid grid-cols-8 gap-x-2 items-center justify-start px-5 sm:py-3 border border-richblack-700 enrolledCoursesTR ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                    }`}
                  key={i}
                >
                  <Td
                    className="flex cursor-pointer items-center gap-4 col-span-5"
                    onClick={() => {
                      navigate(
                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                      )
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      alt="course_img"
                      className="h-20 sm:w-20 w-full rounded-lg object-cover"
                    />
                    <div className="flex max-w-xs flex-col gap-1">
                      <p className="font-semibold">{course.courseName}</p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription.length > 50
                          ? `${course.courseDescription.slice(0, 50)}...`
                          : course.courseDescription}
                      </p>
                    </div>
                  </Td>
                  <Td className="sm:my-0 my-3">{course?.totalDuration}</Td>
                  <Td className="flex flex-col gap-2 col-span-2">
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}
    </>
  )
}