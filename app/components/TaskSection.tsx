import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { SectionHeader } from "./SectionHeader"
import { TaskCard } from "./TaskCard"
import { useEffect } from "react"
import { useStores } from "../models"

export interface TaskSectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Group all tasks
 */
export const TaskSection = observer(function TaskSection(props: TaskSectionProps) {
  const { style } = props
  const $styles = [$container, style]
  const {
    taskStore,
    authenticationStore: { user },
  } = useStores()

  useEffect(() => {
    taskStore.loadTasks(user.uid)
  }, [])

  return (
    <View style={$styles}>
      <View style={$textContainer}>
        <SectionHeader tx="categorySectionComponent.name"></SectionHeader>
      </View>
      <View>
        {taskStore.tasks.map((task) => {
          return <TaskCard task={task} />
        })}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $textContainer: TextStyle = {
  marginTop: spacing.medium,
}